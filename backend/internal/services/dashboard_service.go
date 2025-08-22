package services

import (
	"warehouse-system/internal/models"
	"warehouse-system/internal/repositories"
)

type DashboardService struct {
	itemRepo        *repositories.ItemRepository
	transactionRepo *repositories.TransactionRepository
	opdRepo         *repositories.OPDRepository
	categoryRepo    *repositories.CategoryRepository
}

func NewDashboardService(itemRepo *repositories.ItemRepository, transactionRepo *repositories.TransactionRepository, opdRepo *repositories.OPDRepository, categoryRepo *repositories.CategoryRepository) *DashboardService {
	return &DashboardService{
		itemRepo:        itemRepo,
		transactionRepo: transactionRepo,
		opdRepo:         opdRepo,
		categoryRepo:    categoryRepo,
	}
}

func (s *DashboardService) GetSummary() (*models.DashboardSummary, error) {
	// Get all items for statistics
	items, _, err := s.itemRepo.GetItems(1, 1000, "", "", "")
	if err != nil {
		return nil, err
	}

	// Get all transactions count
	_, totalTransactions, err := s.transactionRepo.GetTransactions(1, 1, "")
	if err != nil {
		return nil, err
	}

	summary := &models.DashboardSummary{
		TotalItems:         int64(len(items)),
		ItemsInWarehouse:   0,
		ItemsInOPD:         0,
		TotalTransactions:  totalTransactions,
		ItemsByCondition:   make(map[string]int),
		ItemsByCategory:    []models.CategoryCount{},
		ItemsByOPD:         []models.OPDCount{},
	}

	// Count items by location and condition
	conditionCount := make(map[string]int)
	categoryCount := make(map[string]int)
	opdCount := make(map[string]int)

	for _, item := range items {
		// Count by location
		if item.CurrentLocation == "Gudang" {
			summary.ItemsInWarehouse++
		} else {
			summary.ItemsInOPD++
		}

		// Count by condition
		conditionCount[item.Condition]++

		// Count by category
		if item.Category != nil {
			categoryCount[item.Category.Name]++
		}

		// Count by OPD
		if item.CurrentOPD != nil {
			opdCount[item.CurrentOPD.Name]++
		}
	}

	summary.ItemsByCondition = conditionCount

	// Convert maps to slices
	for category, count := range categoryCount {
		summary.ItemsByCategory = append(summary.ItemsByCategory, models.CategoryCount{
			CategoryName: category,
			Count:        count,
		})
	}

	for opd, count := range opdCount {
		summary.ItemsByOPD = append(summary.ItemsByOPD, models.OPDCount{
			OPDName: opd,
			Count:   count,
		})
	}

	return summary, nil
}

func (s *DashboardService) GetRecentTransactions() ([]models.Transaction, error) {
	return s.transactionRepo.GetRecentTransactions()
}