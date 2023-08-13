// BACKEND_URL = "http://localhost:8000"
// BACKEND_URL = "https://copyai.pythonanywhere.com";
BACKEND_URL = "https://sunilsingh2019.pythonanywhere.com";
export var BACKEND_URL;

export const BACK_API_LOGIN_URL =
  "/v1/accounts/accounts_data/login_using_token/";

export const BACK_TOKEN_RECEIVE = "/v1/accounts/generate/auth_token/";

export const BACK_API_GET_EMPLOYEE_DATA = "/v1/user/data/";

export const BACK_API_GET_SINGLE_USER = "/v1/user/data/";

export const BACK_API_UPDATE_USER = "/v1/user/data/";

export const BACK_API_GET_COMPANY_DETAILS = "/v1/company/data";

export const BACK_API_GOOGLE = "/v1/accounts/register/google/";

export const BACK_API_FACEBOOK = "/v1/accounts/register/facebook/";

export const BACK_API_SURVEY = "/v1/accounts/survey/data/";


export const BACK_END_API_PROFILE = "/v1/accounts/users_data/";
export const BACK_END_API_PROFILE_UPDATE = "/v1/auth/users/";


export const BACK_END_API_TEMPLATE = "/v1/template/data";
export const BACK_END_API_CUSTOM_TEMPLATE = "/v1/custom_template/create_get/";
export const BACK_END_API_GET_CUSTOM_TEMPLATE = "/v1/custom_template/get_single_template/";
export const BACK_END_API_EXAMPLE_VALUE = "/v1/custom_template/get_example_value/";

export const BACK_END_API_INNER_TEMPLATE = "/v1/template/field?id=";

export const BACK_END_API_RESPONSE = "/v1/template/response_of_template";

export const BACK_END_API_CHAT_ROOM = "/v1/chat/_chat_api_/title/";
export const BACK_END_API_CHAT_DATA = "/v1/chat/_chat_api_/title";
export const BACK_END_API_CHAT_ASK_QUESTION = "/v1/chat/_chat_question_/ask";

export const BACK_API_LANG = "/v1/template/language";

export const BACK_API_HISTORY = "/v1/template/history";

export const BACK_END_API_PROJECT = "/v1/single_response/single_response/";

export const BACK_END_API_SINGLE_TEMPLATE = "/v1/template/project_template/";

export const BACK_END_API_CATEGORIES = "/v1/template/categories";

export const BACK_END_API_DOCUMENTS = "/v1/documents_data/document";
export const BACK_END_API_DOCUMENTS_PATCH =
  "/v1/documents_data/doc_patch/encode";

export const BACK_END_API_PROJECTS = "/v1/projects_data/projects/";

export const BACK_END_API_PROJECT_CHOOSE = "/v1/projects_data/project_choose";

export const BACK_END_API_GET_FOLDER_DETAILS = "/v1/projects_data/projects/";

export const BACK_END_API_BRAND_VOICE = "/v1/brand_voice/data/";

export const BACK_END_API_BRAND_VOICE_URLS = "/v1/brand_voice/extract-url/";

export const BACK_END_API_BRAND_VOICE_FILE = "/v1/brand_voice/extract-file/";

export const BACK_END_API_DOWNLOAD_FILE = "/v1/documents_data/get_doc_file/";

export const BACK_END_API_SELECT_FIELD =
  "/v1/template/select_field_of_template";

export const BACK_END_API_FIRST_CHAT_TEMPLATE =
  "/v1/chat_template/chat-template/";

export const BACK_END_API_VALUE_OF_CHAT_TEMPLATE =
  "/v1/chat_template/get-value-template/";

export const BACK_END_CUSTOM_CHAT_TEMPLATE =
  "/v1/chat_template/custom-template/";

export const BACK_END_MULTIPLE_SELECT_FOR_TRASH =
  "/v1/documents_data/doc_trash/";
export const BACK_END_MULTIPLE_SELECT_FOR_TRASH_PERMANENTLY_DELETE =
  "/v1/documents_data/doc_trash_delete/";
export const BACK_END_MULTIPLE_SELECT_FOR_UPDATE_PROJECT_ID =
  "/v1/documents_data/doc_project_id_update/";


export const BACK_END_API_SUBSCRIBE_CHECK ="/v1/subscription/subscribe-check/";

export const BACK_END_API_SUBSCRIBE_USER ="/v1/subscription/first-create-account-stripe-app-create-session/";

export const BACK_END_API_SUBCRIPTION_DETAILS ="/v1/subscription/subcription-details/";

export const BACK_END_API_SUBCRIPTION_CHARGE ="/v1/subscription/charge/";

export const BACK_END_API_SUBCRIPTION_DIRECT ="/v1/subscription/direct-create-account-stripe-app-create-session/";


export const BACK_END_API_TOKEN_GENERATED ="/v1/template/token_generated/";


// export const BACK_END_API_CANCEL_SUBSCRIPTION ="/v1/subscription/cancel-subscription/";

export const BACK_END_API_CANCEL_SUBSCRIPTION_FINAL ="/v1/subscription/cancel-subscription-final/";
export const BACK_END_API_CANCEL_SUBSCRIPTION_FINAL_FEEDBACK ="/v1/subscription/cancel-subscription-data-feedback/";
export const BACK_END_API_TIMES_REMANING ="/v1/subscription/times-remaining/";

export const BACK_END_API_INVOICE_PORTAL ="/v1/subscription/invoices-portal/";

// export const BACK_END_API_WORKSPACE ="/v1/team_members/workspace/";
export const BACK_END_API_WORKSPACE ="/v1/team_members/team_members_list";

export const BACK_END_API_WORKSPACE_USERS_LIST ="/v1/team_members/list_of_users_in_workshop/";

export const BACK_END_API_INITIAL_WORKSPACE ="/v1/team_members/initial_work_shop_of_user";

export const BACK_END_API_INVITE_WORKSHOP ="/v1/team_members/invite_to_workspace/";

export const BACK_END_API_ACCEPT_INVITATION ="/v1/team_members/accept_invitation/";


export const BACK_END_API_CHECK_ADMIN ="/v1/team_members/disable_invitation/";
export const BACK_END_API_INVITE_GENERATE_LINK ="/v1/team_members/generate_link_for_users/";
export const BACK_END_API_CHANGE_PERMISSION ="/v1/team_members/change_permission/";
export const BACK_END_API_REMOVE_USER ="/v1/team_members/remove_member/";
export const BACK_END_API_REMOVE_USER_FROM_DOC ="/v1/documents_data/remove_edit_permission_doc/";


export const BACK_END_API_CAN_INVITE ="/v1/team_members/check_user_already_there_or_not/";
export const BACK_END_API_DOCUMENTS_USERS ="/v1/team_members/doc_shared_to_user/";
export const BACK_END_API_SEND_INVITATION ="/v1/team_members/invite_with_email_share_doc/";
export const BACK_END_API_CHECK_PUBLIC_OR_NOT ="/v1/team_members/check_public_or_not/";
export const BACK_END_API_MAKE_PUBLIC_OR_NOT ="/v1/team_members/make_workshop_public/";
export const BACK_END_API_DOC_SHARED_TO_USER ="/v1/team_members/doc_shared_to_user/";

