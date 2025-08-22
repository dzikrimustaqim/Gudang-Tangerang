package repositories

import (
	"warehouse-system/internal/models"

	"gorm.io/gorm"
)

type TransactionRepository struct {
	db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) *TransactionRepository {
	return &TransactionRepository{db: db}
}

func (r *TransactionRepository) GetTransactions(page, limit int, direction string) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	var total int64

	query := r.db.Model(&models.Transaction{}).Preload("Item").Preload("SourceOPD").Preload("TargetOPD")

	if direction != "" && direction != "all-directions" {
		query = query.Where("direction = ?", direction)
	}

	// Count total records
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results
	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Order("transaction_date DESC").Find(&transactions).Error; err != nil {
		return nil, 0, err
	}

	return transactions, total, nil
}

func (r *TransactionRepository) CreateTransaction(transaction *models.Transaction) error {
	return r.db.Create(transaction).Error
}

func (r *TransactionRepository) GetTransaction(id string) (*models.Transaction, error) {
	var transaction models.Transaction
	if err := r.db.Preload("Item").Preload("SourceOPD").Preload("TargetOPD").First(&transaction, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &transaction, nil
}

func (r *TransactionRepository) UpdateTransaction(id string, transaction *models.Transaction) error {
	return r.db.Where("id = ?", id).Updates(transaction).Error
}

func (r *TransactionRepository) DeleteTransaction(id string) error {
	return r.db.Delete(&models.Transaction{}, "id = ?", id).Error
}

func (r *TransactionRepository) GetRecentTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	if err := r.db.Preload("Item").Preload("SourceOPD").Preload("TargetOPD").
		Order("transaction_date DESC").Limit(10).Find(&transactions).Error; err != nil {
		return nil, err
	}
	return transactions, nil
}