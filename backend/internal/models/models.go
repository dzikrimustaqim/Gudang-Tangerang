package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Condition string

const (
	ConditionGood    Condition = "Layak pakai"
	ConditionPartial Condition = "Rusak sebagian"
	ConditionBroken  Condition = "Rusak/Hilang"
)

type LocationType string

const (
	LocationWarehouse LocationType = "Gudang"
	LocationOPD       LocationType = "OPD"
)

type TransactionDirection string

const (
	DirectionWarehouseToOPD TransactionDirection = "Gudang → OPD"
	DirectionOPDToWarehouse TransactionDirection = "OPD → Gudang"
	DirectionOPDToOPD       TransactionDirection = "OPD → OPD"
)

// Base model with UUID
type BaseModel struct {
	ID        uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

// OPD represents organizational units
type OPD struct {
	BaseModel
	Name        string `json:"name" gorm:"not null;uniqueIndex"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active" gorm:"default:true"`
}

// Category represents item categories
type Category struct {
	BaseModel
	Name        string `json:"name" gorm:"not null;uniqueIndex"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active" gorm:"default:true"`
}

// Item represents inventory items
type Item struct {
	BaseModel
	SerialNumber     string       `json:"serial_number" gorm:"not null;uniqueIndex"`
	CategoryID       uuid.UUID    `json:"category_id" gorm:"not null"`
	Category         Category     `json:"category" gorm:"foreignKey:CategoryID"`
	Brand            string       `json:"brand" gorm:"not null"`
	Model            string       `json:"model" gorm:"not null"`
	Condition        Condition    `json:"condition" gorm:"not null"`
	Description      string       `json:"description"`
	EntryDate        *time.Time   `json:"entry_date"`
	ExitDate         *time.Time   `json:"exit_date"`
	CurrentLocation  LocationType `json:"current_location" gorm:"not null;default:'Gudang'"`
	CurrentOPDID     *uuid.UUID   `json:"current_opd_id"`
	CurrentOPD       *OPD         `json:"current_opd" gorm:"foreignKey:CurrentOPDID"`
	SpecificLocation string       `json:"specific_location"`
	IsActive         bool         `json:"is_active" gorm:"default:true"`
	Transactions     []Transaction `json:"transactions,omitempty" gorm:"foreignKey:ItemID"`
}

// Transaction represents item movements
type Transaction struct {
	BaseModel
	ItemID              uuid.UUID            `json:"item_id" gorm:"not null"`
	Item                Item                 `json:"item,omitempty" gorm:"foreignKey:ItemID"`
	Direction           TransactionDirection `json:"direction" gorm:"not null"`
	SourceOPDID         *uuid.UUID           `json:"source_opd_id"`
	SourceOPD           *OPD                 `json:"source_opd,omitempty" gorm:"foreignKey:SourceOPDID"`
	TargetOPDID         *uuid.UUID           `json:"target_opd_id"`
	TargetOPD           *OPD                 `json:"target_opd,omitempty" gorm:"foreignKey:TargetOPDID"`
	SpecificLocation    string               `json:"specific_location"`
	Notes               string               `json:"notes"`
	TransactionDate     time.Time            `json:"transaction_date" gorm:"not null"`
	ProcessedBy         string               `json:"processed_by"`
}

// Request/Response DTOs
type CreateItemRequest struct {
	SerialNumber     string    `json:"serial_number" binding:"required"`
	CategoryID       uuid.UUID `json:"category_id" binding:"required"`
	Brand            string    `json:"brand" binding:"required"`
	Model            string    `json:"model" binding:"required"`
	Condition        Condition `json:"condition" binding:"required"`
	Description      string    `json:"description"`
	SpecificLocation string    `json:"specific_location"`
}

type CreateTransactionRequest struct {
	ItemID           uuid.UUID            `json:"item_id" binding:"required"`
	Direction        TransactionDirection `json:"direction" binding:"required"`
	SourceOPDID      *uuid.UUID           `json:"source_opd_id"`
	TargetOPDID      *uuid.UUID           `json:"target_opd_id"`
	SpecificLocation string               `json:"specific_location"`
	Notes            string               `json:"notes"`
	ProcessedBy      string               `json:"processed_by"`
}

type CreateOPDRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

type CreateCategoryRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

type DashboardSummary struct {
	TotalItems       int64                    `json:"total_items"`
	ItemsInWarehouse int64                    `json:"items_in_warehouse"`
	ItemsInOPD       int64                    `json:"items_in_opd"`
	TotalTransactions int64                   `json:"total_transactions"`
	ItemsByCondition map[Condition]int64      `json:"items_by_condition"`
	ItemsByCategory  []CategorySummary        `json:"items_by_category"`
	ItemsByOPD       []OPDSummary             `json:"items_by_opd"`
}

type CategorySummary struct {
	CategoryName string `json:"category_name"`
	Count        int64  `json:"count"`
}

type OPDSummary struct {
	OPDName string `json:"opd_name"`
	Count   int64  `json:"count"`
}

type ItemSearchParams struct {
	Query      string `form:"q"`
	CategoryID string `form:"category_id"`
	OPDID      string `form:"opd_id"`
	Location   string `form:"location"`
	Condition  string `form:"condition"`
	Page       int    `form:"page"`
	Limit      int    `form:"limit"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	TotalCount int64       `json:"total_count"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
}