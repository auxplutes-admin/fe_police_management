import axios from "axios";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/constant";
import { LoginResponse } from "@/types";
import useSession from "@/hooks/useSession";



export const API_CLIENT = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

API_CLIENT.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = localStorage.getItem(SESSION_COOKIE_NAME) ?? "";
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const officerLogin = async (payload: {
  email: string;
  password: string;
}):Promise<LoginResponse> => {
  try {
    const sessionInfo = await useSession.createSession( payload.email );
    const {email, password} = payload;
    const response = await API_CLIENT.post("police-officers/login", { email, password, sessionInfo });
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};  

// Officer Management
export const createPoliceOfficer = async (payload: {
  station_id: string,
  officer_name: string,
  officer_designation: string,
  officer_badge_number: string,
  officer_mobile_number: number,
  officer_email: string,
  officer_status: string,
}) => {
  const response = await API_CLIENT.post(
    "police-officers/create-officer",
    payload
  );
  return response.data;
}

export const getOfficerProfile = async () => {
  const response = await API_CLIENT.get("police-officers/get-officer-profile")
  return response.data.data;
}

export const getAllPoliceOfficersByStationId = async (payload: {
  station_id: string,
  page?: number,
  limit?: number,
}) => {
  const response = await API_CLIENT.post("police-officers/get-all-officers", payload)
  return response.data;
}

export const getPoliceOfficerById = async (payload: {
  officer_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("police-officers/get-officer-by-id-and-station", payload)
  return response.data;
}



// Crime Management
export const createCrime = async (payload: {
  sr_no: string,
  case_no: string,
  crime_year: string,
  crime_section: string,
  crime_part: string,
  crime_type: string,
  crime_subtype: string,
  filing_date: string,
  crime_latitude: number,
  crime_longitude: number,
  crime_investigating_officer: string,
  crime_status: string,
  crime_outward_number: string,
  crime_chargesheet_date: string,
  crime_pending_reason: string,
  crime_investigation_done: boolean,
  crime_location: string,
  crime_property_value: number,
  crime_property_recovery: number,
  crime_reveal_date: string,
  crime_punishment_gt_7: boolean,
  crime_forensic_expert_visit: boolean,
  crime_e_sakshi_added: boolean,
  crime_forensic_expert_visit_date: string,
  crime_detention_period: string,
  crime_new_investigation_officer: string,
  crime_pending_duration: string,
  crime_investigation_reason: string,
  crime_complainant_address: string,
  crime_complainant_age: number,
  crime_complainant_name: string,
  crime_complainant_gender: string,
  crime_complainant_mobile_no: string,
  crime_occurrence_date: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post(
    "crimes/create-crime",
    payload
  );
  return response.data;
}

export const getAllCrimes = async (payload: {
  station_id: string,
  page: number,
  limit: number,
}) => {
  const response = await API_CLIENT.post("crimes/get-all-crimes", payload)
  return response.data;
}

export const getCrimeById = async (payload: {
  crime_id: string,
}) => {
  const response = await API_CLIENT.post("crimes/get-crime-by-id", payload)
  return response.data;
}

export const updateCrime = async (payload: {
  crime_id: string,
  sr_no: string,
  case_no: string,
  crime_year: string,
  crime_section: string,
  crime_part: string,
  crime_type: string,
  crime_subtype: string,
  filing_date: string,
  crime_latitude: number,
  crime_longitude: number,
  crime_investigating_officer: string,
  crime_status: string,
  crime_outward_number: string,
  crime_chargesheet_date: string,
  crime_pending_reason: string,
  crime_investigation_done: boolean,
  crime_location: string,
  crime_property_value: number,
  crime_property_recovery: number,
  crime_reveal_date: string,
  crime_punishment_gt_7: boolean,
  crime_forensic_expert_visit: boolean,
  crime_e_sakshi_added: boolean,
  crime_forensic_expert_visit_date: string,
  crime_detention_period: string,
  crime_new_investigation_officer: string,
  crime_pending_duration: string,
  crime_investigation_reason: string,
  crime_complainant_address: string,
  crime_complainant_age: number,
  crime_complainant_name: string,
  crime_complainant_gender: string,
  crime_complainant_mobile_no: string,
  crime_occurrence_date: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crimes/update-crime", payload)
  return response.data;
}

export const deleteCrime = async (payload: {
  crime_id: string,
}) => {
  const response = await API_CLIENT.post("crimes/delete-crime", payload)
  return response.data;
}

export const getLatestSrNo = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crimes/get-latest-sr-no", payload)
  return response.data;
}


// Station Management
export const getPoliceStationById = async (payload: {
  station_id: string;
}) => {
  const response = await API_CLIENT.post("police-stations/get-station-by-id", payload)
  return response.data;
}

export const updatePoliceStation = async (payload: {
  station_id: string;
  station_name: string;
  station_address: string;
  station_city: string;
  station_state: string;
  station_pincode: string;
}) => {
  const response = await API_CLIENT.post("police-stations/update", payload)
  return response.data;
}

// Session Management
export const getOfficerSessionsByOfficerId = async (payload: {
  officer_id: string;
}) => {
  const response = await API_CLIENT.post("police-officers/get-officer-sessions", payload)
  return response.data;
}


// Application Management
export const createApplication = async (payload: {
  sr_no: string,
  application_no: string,
  inward_no: string,
  received_from: string,
  source_outward_no: string,
  police_station_inward_no: string,
  received_date: string,
  year: string,
  applicant_name: string,
  applicant_address: string,
  applicant_mobile: string,
  respondent_name: string,
  respondent_mobile: string,
  respondent_address: string,
  application_type: string,
  brief_matter: string,
  investigation_officer: string,
  previous_officer: string,
  current_status: string,
  action_taken: string,
  outward_date: string,
  application_classification: string
}) => {
  const response = await API_CLIENT.post("applications/create-application", payload)
  return response.data;
}

export const getApplicationById = async (payload: {
  application_id: string,
  officer_id: string,
}) => {
  const response = await API_CLIENT.post("applications/get-application-by-id", payload)
  return response.data;
}

export const updateApplication = async (payload: {
  application_id: string,
  officer_id: string,
  sr_no: string,
  application_no: string,
  inward_no: string,
  received_from: string,
  source_outward_no: string,
  police_station_inward_no: string,
  received_date: string,
  year: string,
  applicant_name: string,
  applicant_address: string,
  applicant_mobile: string,
  respondent_name: string,
  respondent_mobile: string,
  respondent_address: string,
  application_type: string,
  brief_matter: string,
  investigation_officer: string,
  previous_officer: string,
  current_status: string,
  action_taken: string,
  outward_date: string,
  application_classification: string
}) => {
  const response = await API_CLIENT.post("applications/update-application", payload)
  return response.data;
}

export const getAllApplications = async (payload: {
  station_id: string,
  page: number,
  limit: number,
}) => {
  const response = await API_CLIENT.post("applications/get-all-applications", payload)
  return response.data;
}

export const deleteApplication = async (payload: {
  officer_id: string,
  application_id: string,
}) => {
  const response = await API_CLIENT.post("applications/delete-application", payload)
  return response.data;
}

export const getApplicationsByType = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("applications/get-applications-by-type", payload)
  return response.data;
}


// Application Data Rules
export const createApplicationType = async (payload: {
  application_type_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/create-application-type", payload)
  return response.data;
}

export const getApplicationTypeById = async (payload: {
  application_type_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/get-application-type-by-id", payload)
  return response.data;
}

export const updateApplicationType = async (payload: {
  application_type_id: string,
  application_type_name: string,    
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/update-application-type", payload)
  return response.data;
}

export const getAllApplicationTypes = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/get-all-application-types", payload)
  return response.data;
}

export const deleteApplicationType = async (payload: {
  application_type_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/delete-application-type", payload)
  return response.data;
}

export const createApplicationClassification = async (payload: {
  application_classification_name: string,
  station_id: string,
}) => {   
  const response = await API_CLIENT.post("application-data-rules/create-application-classification", payload)
  return response.data;
}

export const getApplicationClassificationById = async (payload: {
  application_classification_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/get-application-classification-by-id", payload)
  return response.data;
}

export const updateApplicationClassification = async (payload: {
  application_classification_id: string,
  application_classification_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/update-application-classification", payload)
  return response.data;
}

export const getAllApplicationClassifications = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("application-data-rules/get-all-application-classifications", payload)
  return response.data;
}

export const deleteApplicationClassification = async (payload: {
  application_classification_id: string,
}) => { 
  const response = await API_CLIENT.post("application-data-rules/delete-application-classification", payload)
  return response.data;
}

// Crime Data Rules
export const createCrimePart = async (payload: {
  crime_part_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/create-crime-part", payload)
  return response.data;
}

export const getCrimePartById = async (payload: { 
  crime_part_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-crime-part-by-id", payload)
  return response.data;
}

export const updateCrimePart = async (payload: {
  crime_part_id: string,
  crime_part_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/update-crime-part", payload)
  return response.data;
}

export const getAllCrimeParts = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-all-crime-parts", payload)
  return response.data;
}

export const deleteCrimePart = async (payload: {
  crime_part_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/delete-crime-part", payload)
  return response.data;
}

export const createCrimeType = async (payload: {
  crime_type_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/create-crime-type", payload)
  return response.data;
}

export const getCrimeTypeById = async (payload: {
  crime_type_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-crime-type-by-id", payload)
  return response.data;
}

export const updateCrimeType = async (payload: {
  crime_type_id: string,
  crime_type_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/update-crime-type", payload)
  return response.data;
} 

export const getAllCrimeTypes = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-all-crime-types", payload)
  return response.data;
}

export const deleteCrimeType = async (payload: {
  crime_type_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/delete-crime-type", payload)
  return response.data;
}

export const createCrimeSubType = async (payload: {
  crime_type_id: string,
  crime_type_name: string,
  crime_subtype_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/create-crime-subtype", payload)
  return response.data;
}

export const getCrimeSubTypeById = async (payload: {
  crime_subtype_id: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-crime-subtype-by-id", payload)
  return response.data;
}

export const updateCrimeSubType = async (payload: {
  crime_subtype_id: string,
  crime_type_id: string,
  crime_type_name: string,
  crime_subtype_name: string,
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/update-crime-subtype", payload)
  return response.data;
}

export const getAllCrimeSubTypes = async (payload: {
  station_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/get-all-crime-subtypes", payload)
  return response.data;
}

export const deleteCrimeSubType = async (payload: {
  crime_subtype_id: string,
}) => {
  const response = await API_CLIENT.post("crime-data-rules/delete-crime-subtype", payload)
  return response.data;
}
