interface TplSearchResponse {
  currentReservationCount: number;
  allowReservations: boolean;
  monthsToDisplay: number;
  remote: string;
  dateSelected?: any;
  attractionCount: number;
  attractionList: AttractionList[];
  initBackgroundImage: InitBackgroundImage;
  status: string;
}

interface InitBackgroundImage {
  filename: string;
  title: string;
  status: string;
}

interface AttractionList {
  attractionID: number;
  name: string;
  attractionMainStreet: string;
  city: string;
  state: string;
  postalCode: string;
  attractionDescription: string;
  attractionPromotion?: any;
  image_name: string;
  patronLimitQuantity: number;
  patronLimitFrequency: string;
  require_pass_print: string;
  website: string;
  venueLocations: VenueLocation[];
  attractionLimitReached: string;
  reservationsLimitReached: string;
  offers?: Offer[];
  attractionOffersCount: number;
  reservationsUnavailableMessage?: string;
}

interface Offer {
  venueName: string;
  latitude: string;
  longitude: string;
  venueStreet: string;
  venueCity: string;
  venueState: string;
  venuePostalCode: string;
  attractionVenueType: string;
  venueDescription: string;
  venueADAInfo: string;
  startDate: string;
  endDate: string;
  offerID: number;
  attractionID: number;
  attractionVenueID: number;
  internalOfferName: string;
  offerTitle: string;
  offerDescription: string;
  passSharing: string;
  regionID: number;
  offersFrequency: string;
  offersQuantity: number;
  excludeGeneralOfferIDs: string;
  postalCodeInclusion: string;
  postalCodes: string;
  passRequired: string;
  ageRestriction: number;
  advancedReservation: string;
  advancedReservationInstructions: string;
  displayTimes: string;
  startTime: string;
  endTime: string;
  sponsor: string;
  libraryFrequency: string;
  libraryQuantity: number;
  dates: string[];
  date: string;
}

interface VenueLocation {
  name: string;
  venueStreet: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}