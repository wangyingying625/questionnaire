import * as API from './'

// GetMapDepartment
export const submitInfo = params => API.POST('submit', params)
export const searchInfo = params => API.POST('get_my_survey', params)
export const delInfo = params => API.POST('cancel_survey', params)
export const passInfo = params => API.POST('to_obtain_credentials', params)
