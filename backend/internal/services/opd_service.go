package services

import (
	"time"
	"warehouse-system/internal/models"
	"warehouse-system/internal/repositories"

	"github.com/google/uuid"
)

type OPDService struct {
	opdRepo *repositories.OPDRepository
}

func NewOPDService(opdRepo *repositories.OPDRepository) *OPDService {
	return &OPDService{opdRepo: opdRepo}
}

func (s *OPDService) GetOPDs() ([]models.OPD, error) {
	return s.opdRepo.GetOPDs()
}

func (s *OPDService) CreateOPD(req *models.CreateOPDRequest) (*models.OPD, error) {
	opd := &models.OPD{
		ID:          uuid.New().String(),
		Name:        req.Name,
		Description: req.Description,
		IsActive:    true,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := s.opdRepo.CreateOPD(opd); err != nil {
		return nil, err
	}

	return opd, nil
}

func (s *OPDService) GetOPD(id string) (*models.OPD, error) {
	return s.opdRepo.GetOPD(id)
}

func (s *OPDService) UpdateOPD(id string, req *models.CreateOPDRequest) (*models.OPD, error) {
	opd := &models.OPD{
		Name:        req.Name,
		Description: req.Description,
		UpdatedAt:   time.Now(),
	}

	if err := s.opdRepo.UpdateOPD(id, opd); err != nil {
		return nil, err
	}

	return s.opdRepo.GetOPD(id)
}

func (s *OPDService) DeleteOPD(id string) error {
	return s.opdRepo.DeleteOPD(id)
}