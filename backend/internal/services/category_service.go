package services

import (
	"time"
	"warehouse-system/internal/models"
	"warehouse-system/internal/repositories"

	"github.com/google/uuid"
)

type CategoryService struct {
	categoryRepo *repositories.CategoryRepository
}

func NewCategoryService(categoryRepo *repositories.CategoryRepository) *CategoryService {
	return &CategoryService{categoryRepo: categoryRepo}
}

func (s *CategoryService) GetCategories() ([]models.Category, error) {
	return s.categoryRepo.GetCategories()
}

func (s *CategoryService) CreateCategory(req *models.CreateCategoryRequest) (*models.Category, error) {
	category := &models.Category{
		ID:          uuid.New().String(),
		Name:        req.Name,
		Description: req.Description,
		IsActive:    true,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := s.categoryRepo.CreateCategory(category); err != nil {
		return nil, err
	}

	return category, nil
}

func (s *CategoryService) GetCategory(id string) (*models.Category, error) {
	return s.categoryRepo.GetCategory(id)
}

func (s *CategoryService) UpdateCategory(id string, req *models.CreateCategoryRequest) (*models.Category, error) {
	category := &models.Category{
		Name:        req.Name,
		Description: req.Description,
		UpdatedAt:   time.Now(),
	}

	if err := s.categoryRepo.UpdateCategory(id, category); err != nil {
		return nil, err
	}

	return s.categoryRepo.GetCategory(id)
}

func (s *CategoryService) DeleteCategory(id string) error {
	return s.categoryRepo.DeleteCategory(id)
}