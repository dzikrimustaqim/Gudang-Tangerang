package repositories

import (
	"warehouse-system/internal/models"

	"gorm.io/gorm"
)

type OPDRepository struct {
	db *gorm.DB
}

func NewOPDRepository(db *gorm.DB) *OPDRepository {
	return &OPDRepository{db: db}
}

func (r *OPDRepository) GetOPDs() ([]models.OPD, error) {
	var opds []models.OPD
	if err := r.db.Where("is_active = ?", true).Order("name").Find(&opds).Error; err != nil {
		return nil, err
	}
	return opds, nil
}

func (r *OPDRepository) CreateOPD(opd *models.OPD) error {
	return r.db.Create(opd).Error
}

func (r *OPDRepository) GetOPD(id string) (*models.OPD, error) {
	var opd models.OPD
	if err := r.db.First(&opd, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &opd, nil
}

func (r *OPDRepository) UpdateOPD(id string, opd *models.OPD) error {
	return r.db.Where("id = ?", id).Updates(opd).Error
}

func (r *OPDRepository) DeleteOPD(id string) error {
	return r.db.Model(&models.OPD{}).Where("id = ?", id).Update("is_active", false).Error
}