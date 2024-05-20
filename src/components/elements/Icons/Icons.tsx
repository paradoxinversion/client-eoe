import {
  Dangerous as DangerousIcon,
  Done as DoneIcon,
  TravelExplore as TravelExploreIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
  Warning as WarningIcon,
  Paid as PaidIcon,
  LocalHospital as LocalHospitalIcon,
  AccountBalance as AccountBalanceIcon,
  Apartment as ApartmentIcon,
  Business as BusinessIcon,
  Biotech as BiotechIcon,
} from "@mui/icons-material";

const icons = {
  general: {
    DangerousIcon,
    DoneIcon,
    Info: InfoIcon,
    Warning: WarningIcon,
    Payment: PaidIcon,
  },
  buildings: {
    hospital: LocalHospitalIcon,
    bank: AccountBalanceIcon,
    apartment: ApartmentIcon,
    office: BusinessIcon,
    laboratory: BiotechIcon,
  },
  TravelExploreIcon,
  ContactPageIcon,
};

export default icons;
