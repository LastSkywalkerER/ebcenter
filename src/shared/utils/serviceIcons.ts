import {
  ConsultingIcon,
  ContractPriceIcon,
  ContractsIcon,
  CurrentRepairIcon,
  EstimateDocsIcon,
  EstimateServiceIcon,
  IndividualIcon,
  LocalEstimatesIcon,
  ReportingIcon,
  SelfServiceIcon,
} from '@/shared/ui/icons/ServiceIcons'
import React from 'react'

export const getServiceIcon = (key: string): React.ReactNode => {
  switch (key) {
    case 'estimateService':
      return React.createElement(EstimateServiceIcon)
    case 'currentRepair':
      return React.createElement(CurrentRepairIcon)
    case 'estimateDocs':
      return React.createElement(EstimateDocsIcon)
    case 'contractPrice':
      return React.createElement(ContractPriceIcon)
    case 'contracts':
      return React.createElement(ContractsIcon)
    case 'reporting':
      return React.createElement(ReportingIcon)
    case 'localEstimates':
      return React.createElement(LocalEstimatesIcon)
    case 'consulting':
      return React.createElement(ConsultingIcon)
    case 'selfService':
      return React.createElement(SelfServiceIcon)
    case 'individual':
      return React.createElement(IndividualIcon)
    default:
      return React.createElement(EstimateServiceIcon)
  }
}
