package repositories

import (
	"warehouse-system/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ItemRepository interface {
	GetAll(params *models.ItemSearchParams) ([]models.Item, int64, error)
	GetByID(id uuid.UUID) (*models.Item, error)
	GetBySerialNumber(serialNumber string) (*models.Item, error)
	Create(item *models.Item) error
	Update(item *models.Item) error
	Delete(id uuid.UUID) error
	GetSummary() (*models.DashboardSummary, error)
}

type itemRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) ItemRepository {
	return &itemRepository{db: db}
}

func (r *itemRepository) GetAll(params *models.ItemSearchParams) ([]models.Item, int64, error) {
	var items []models.Item
	var total int64

	query := r.db.Model(&models.Item{}).
		Preload("Category").
		Preload("CurrentOPD").
		Where("is_active = ?", true)

	// Apply filters
	if params.Query != "" {
		query = query.Where(
			"serial_number ILIKE ? OR brand ILIKE ? OR model ILIKE ? OR description ILIKE ?",
			"%"+params.Query+"%", "%"+params.Query+"%", "%"+params.Query+"%", "%"+params.Query+"%",
		)
	}

	if params.CategoryID != "" {
		if categoryUUID, err := uuid.Parse(params.CategoryID); err == nil {
			query = query.Where("category_id = ?", categoryUUID)
		}
	}

	if params.OPDID != "" {
		if opdUUID, err := uuid.Parse(params.OPDID); err == nil {
			query = query.Where("current_opd_id = ?", opdUUID)
		}
	}

	if params.Location != "" {
		query = query.Where("current_location = ?", params.Location)
	}

	if params.Condition != "" {
		query = query.Where("condition = ?", params.Condition)
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Apply pagination
	if params.Limit == 0 {
		params.Limit = 20
	}
	if params.Page < 1 {
		params.Page = 1
	}

	offset := (params.Page - 1) * params.Limit
	if err := query.Offset(offset).Limit(params.Limit).Order("updated_at DESC").Find(&items).Error; err != nil {
		return nil, 0, err
	}

	return items, total, nil
}

func (r *itemRepository) GetByID(id uuid.UUID) (*models.Item, error) {
	var item models.Item
	err := r.db.Preload("Category").
		Preload("CurrentOPD").
		Preload("Transactions").
		Preload("Transactions.SourceOPD").
		Preload("Transactions.TargetOPD").
		First(&item, "id = ? AND is_active = ?", id, true).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *itemRepository) GetBySerialNumber(serialNumber string) (*models.Item, error) {
	var item models.Item
	err := r.db.Preload("Category").
		Preload("CurrentOPD").
		First(&item, "serial_number = ? AND is_active = ?", serialNumber, true).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *itemRepository) Create(item *models.Item) error {
	return r.db.Create(item).Error
}

func (r *itemRepository) Update(item *models.Item) error {
	return r.db.Save(item).Error
}

func (r *itemRepository) Delete(id uuid.UUID) error {
	return r.db.Model(&models.Item{}).Where("id = ?", id).Update("is_active", false).Error
}

func (r *itemRepository) GetSummary() (*models.DashboardSummary, error) {
	var summary models.DashboardSummary

	// Total items
	r.db.Model(&models.Item{}).Where("is_active = ?", true).Count(&summary.TotalItems)

	// Items in warehouse
	r.db.Model(&models.Item{}).Where("is_active = ? AND current_location = ?", true, models.LocationWarehouse).Count(&summary.ItemsInWarehouse)

	// Items in OPD
	r.db.Model(&models.Item{}).Where("is_active = ? AND current_location = ?", true, models.LocationOPD).Count(&summary.ItemsInOPD)

	// Total transactions
	r.db.Model(&models.Transaction{}).Count(&summary.TotalTransactions)

	// Items by condition
	summary.ItemsByCondition = make(map[models.Condition]int64)
	conditions := []models.Condition{models.ConditionGood, models.ConditionPartial, models.ConditionBroken}
	for _, condition := range conditions {
		var count int64
		r.db.Model(&models.Item{}).Where("is_active = ? AND condition = ?", true, condition).Count(&count)
		summary.ItemsByCondition[condition] = count
	}

	// Items by category
	var categorySummaries []models.CategorySummary
	r.db.Model(&models.Item{}).
		Select("categories.name as category_name, COUNT(*) as count").
		Joins("JOIN categories ON items.category_id = categories.id").
		Where("items.is_active = ? AND categories.is_active = ?", true, true).
		Group("categories.name").
		Scan(&categorySummaries)
	summary.ItemsByCategory = categorySummaries

	// Items by OPD
	var opdSummaries []models.OPDSummary
	r.db.Model(&models.Item{}).
		Select("opds.name as opd_name, COUNT(*) as count").
		Joins("JOIN opds ON items.current_opd_id = opds.id").
		Where("items.is_active = ? AND items.current_location = ? AND opds.is_active = ?", true, models.LocationOPD, true).
		Group("opds.name").
		Scan(&opdSummaries)
	summary.ItemsByOPD = opdSummaries

	return &summary, nil
}