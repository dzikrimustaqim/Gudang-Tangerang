package repositories

import (
	"warehouse-system/internal/models"

	"gorm.io/gorm"
)

type CategoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{db: db}
}

func (r *CategoryRepository) GetCategories() ([]models.Category, error) {
	var categories []models.Category
	if err := r.db.Where("is_active = ?", true).Order("name").Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

func (r *CategoryRepository) CreateCategory(category *models.Category) error {
	return r.db.Create(category).Error
}

func (r *CategoryRepository) GetCategory(id string) (*models.Category, error) {
	var category models.Category
	if err := r.db.First(&category, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &category, nil
}

func (r *CategoryRepository) UpdateCategory(id string, category *models.Category) error {
	return r.db.Where("id = ?", id).Updates(category).Error
}

func (r *CategoryRepository) DeleteCategory(id string) error {
	return r.db.Model(&models.Category{}).Where("id = ?", id).Update("is_active", false).Error
}