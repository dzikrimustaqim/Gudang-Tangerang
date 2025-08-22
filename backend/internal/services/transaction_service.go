package services

import (
	"time"
	"warehouse-system/internal/models"
	"warehouse-system/internal/repositories"

	"github.com/google/uuid"
)

type TransactionService struct {
	transactionRepo *repositories.TransactionRepository
	itemRepo        *repositories.ItemRepository
}

func NewTransactionService(transactionRepo *repositories.TransactionRepository, itemRepo *repositories.ItemRepository) *TransactionService {
	return &TransactionService{
		transactionRepo: transactionRepo,
		itemRepo:        itemRepo,
	}
}

func (s *TransactionService) GetTransactions(page, limit int, direction string) ([]models.Transaction, int64, error) {
	return s.transactionRepo.GetTransactions(page, limit, direction)
}

func (s *TransactionService) CreateTransaction(req *models.CreateTransactionRequest) (*models.Transaction, error) {
	// Get the item to validate it exists and get current location
	item, err := s.itemRepo.GetItem(req.ItemID)
	if err != nil {
		return nil, err
	}

	transaction := &models.Transaction{
		ID:               uuid.New().String(),
		ItemID:           req.ItemID,
		Direction:        req.Direction,
		SourceOPDID:      req.SourceOPDID,
		TargetOPDID:      req.TargetOPDID,
		SpecificLocation: req.SpecificLocation,
		Notes:            req.Notes,
		TransactionDate:  time.Now(),
		ProcessedBy:      req.ProcessedBy,
	}

	// Create transaction
	if err := s.transactionRepo.CreateTransaction(transaction); err != nil {
		return nil, err
	}

	// Update item location based on transaction
	updateReq := &models.CreateItemRequest{
		SerialNumber:     item.SerialNumber,
		CategoryID:       item.CategoryID,
		Brand:            item.Brand,
		Model:            item.Model,
		Condition:        item.Condition,
		Description:      item.Description,
		SpecificLocation: req.SpecificLocation,
	}

	// Update location based on direction
	switch req.Direction {
	case "Gudang → OPD":
		updateReq.CurrentLocation = "OPD"
		updateReq.CurrentOPDID = req.TargetOPDID
	case "OPD → Gudang":
		updateReq.CurrentLocation = "Gudang"
		updateReq.CurrentOPDID = nil
	case "OPD → OPD":
		updateReq.CurrentLocation = "OPD"
		updateReq.CurrentOPDID = req.TargetOPDID
	}

	// Update item
	_, err = s.itemRepo.UpdateItem(req.ItemID, updateReq)
	if err != nil {
		return nil, err
	}

	// Return transaction with relations
	return s.transactionRepo.GetTransaction(transaction.ID)
}

func (s *TransactionService) GetTransaction(id string) (*models.Transaction, error) {
	return s.transactionRepo.GetTransaction(id)
}

func (s *TransactionService) UpdateTransaction(id string, req *models.CreateTransactionRequest) (*models.Transaction, error) {
	transaction := &models.Transaction{
		ItemID:           req.ItemID,
		Direction:        req.Direction,
		SourceOPDID:      req.SourceOPDID,
		TargetOPDID:      req.TargetOPDID,
		SpecificLocation: req.SpecificLocation,
		Notes:            req.Notes,
		ProcessedBy:      req.ProcessedBy,
	}

	if err := s.transactionRepo.UpdateTransaction(id, transaction); err != nil {
		return nil, err
	}

	return s.transactionRepo.GetTransaction(id)
}

func (s *TransactionService) DeleteTransaction(id string) error {
	return s.transactionRepo.DeleteTransaction(id)
}