package repositories

import (
	"gorm.io/gorm"
)

type Repositories struct {
	Item        ItemRepository
	Transaction TransactionRepository
	OPD         OPDRepository
	Category    CategoryRepository
}

func NewRepositories(db *gorm.DB) *Repositories {
	return &Repositories{
		Item:        NewItemRepository(db),
		Transaction: NewTransactionRepository(db),
		OPD:         NewOPDRepository(db),
		Category:    NewCategoryRepository(db),
	}
}