package services

import "warehouse-system/internal/repositories"

type Services struct {
	Item        ItemService
	Transaction TransactionService
	OPD         OPDService
	Category    CategoryService
}

func NewServices(repos *repositories.Repositories) *Services {
	return &Services{
		Item:        NewItemService(repos.Item, repos.Transaction),
		Transaction: NewTransactionService(repos.Transaction, repos.Item),
		OPD:         NewOPDService(repos.OPD),
		Category:    NewCategoryService(repos.Category),
	}
}