import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";

import CaretDown from "../../Icons/CaretDown";
import {
  postData,
  fetchData,
  patchData,
  deleteData,
} from "../../../apis/apiService";
import {
  BACKEND_URL,
  BACK_END_API_CHAT_DATA,
  BACK_END_API_CHAT_ROOM,
  BACK_END_API_BRAND_VOICE,
  BACK_END_API_CHAT_ASK_QUESTION,
  BACK_END_API_FIRST_CHAT_TEMPLATE,
  BACK_END_API_VALUE_OF_CHAT_TEMPLATE,
  BACK_END_CUSTOM_CHAT_TEMPLATE,
} from "../../../apis/urls";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import RenderHtml from "../Template/RenderHtml";
import RenderTemplate from "../Template/RenderTemplate";
import RenderHtmlData from "../Template/RenderHtmlData";

import { GrClose } from "react-icons/gr";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Popover from "@mui/material/Popover";
import Differentbtn from "./Differentbtn";
import { useSelector, useDispatch } from "react-redux";
import Typed from "react-typed";
import LoadingPage from "../../LoadingPage";
import { _save_ask_question_again_ } from "../../../features/RepeatQuestionInChat";
import { _save_details_ } from "../../../features/Subscriptions";

const buttonTags = [
  "All",
  "Blog",
  "Business",
  "Ecommerce",
  "Email",
  "Frameworks",
  "Freemium",
  "Google",
  "Marketing",
  "New",
  "SEO",
  "Social Media",
];

const tagList = [
  "Create an image of...",
  "Create a list of 10 blog post titles about...",
  "Write a paragraph about...",
  "Help me create a short story about...",
  "Summarize the following text...",
  "Write a Facebook ad for the holidays...",
  "Write a blog post about...",
  "Write a country song about cats in the style o...",
];

const Chat = ({ AUTH_TOKEN }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const chatContainerRef = useRef(null);
  const chatLoadingRef = useRef(null);

  const divRef = useRef(null);

  let upgrade_plan={restrict_user: true, customer_stripe_id: 'null', email: 'null', subscription_type: 'null', status: 'trial'}


  const notifyerror = (message) => toast.error(message);
  const notifysucces = (message) => toast.success(message);
  const notifymessage = (message) =>
    toast(message, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  const [chatFill, setChatFill] = useState("");
  const [ChatText, setChatText] = useState("");
  const [AllChatText, setAllChatText] = useState([]);
  const [TitleOfChat, setTitleOfChat] = useState('');
  const [IdOfTopTitleChat, setIdOfTopTitleChat] = useState(null);
  const [AnswerOfChat, setAnswerOfChat] = useState("");

  const [CurrentQuestionIni, setCurrentQuestionIni] = useState(null);
  const [CurrentAnswerIni, setCurrentAnswerIni] = useState([]);
  const [AfterTypeDontShowIni, setAfterTypeDontShowIni] = useState(false);

  const [CurrentQuestion, setCurrentQuestion] = useState(null);
  const [CurrentAnswer, setCurrentAnswer] = useState([]);

  const [
    LatestOrCurrentClickGetChatFromID,
    setLatestOrCurrentClickGetChatFromID,
  ] = useState(null);

  const [ChatTitleForSideBar, setChatTitleForSideBar] = useState(null);

  const [Loading, setLoading] = useState(false);
  const [check_to_stop_typing, setcheck_to_stop_typing] = useState(false);

  const [sidebarStatus, setSidebarStatus] = useState(false);

  const [open, setOpen] = useState(false);
  const [popStat, setPopStat] = useState(false);

  const popRef = React.useRef();

  let REPEAT_QUESTION = useSelector(
    (state) => state.SetRepeatQuestionInChat.RepeatQuestionInChat
  );

  let ChosenWorkspaceId = useSelector(
    (state) => state.SetChosenWorkspaceId.ChosenWorkspaceId
    );	


  let subscriptions_check = useSelector(
    (state) => state.SetSubscriptions.Subscriptions
  );

  const get_initial_chat = async (url, room_id) => {
    const resp = await fetchData(url + "/" + room_id + "/", AUTH_TOKEN);
    if (resp.status == 200 || resp.status == 201) {
      setAllChatText(resp.data.chat_data);
      // if(resp.data.length>0){
      setTitleOfChat(resp.data.title);
      setIdOfTopTitleChat(resp.data.id);
      // }
    } else {
      // navigate("/logout");
    }
  };
  const get_chat_data_from_side_div_when_click = async (url, room_id) => {
    setCurrentAnswer([]);
    setCurrentAnswerIni([]);
    const resp = await fetchData(url + "/" + room_id + "/", AUTH_TOKEN);
    if (resp.status == 200 || resp.status == 201) {
      setAllChatText(resp.data.chat_data);
      setTitleOfChat(resp.data.title);
      setIdOfTopTitleChat(resp.data.id);
    } else {
      // navigate("/logout");
    }
  };

  const create_new_room_for_chat = async () => {
    setCurrentAnswer([]);
    setCurrentAnswerIni([]);
    const formData = {};
    const resp = await postData(
      formData,
      BACKEND_URL + BACK_END_API_CHAT_ROOM,
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      get_title_of_chat_room_first(BACKEND_URL + BACK_END_API_CHAT_ROOM);
    }
  };

  useEffect(() => {
    if (LatestOrCurrentClickGetChatFromID != null) {
      get_initial_chat(
        BACKEND_URL + BACK_END_API_CHAT_DATA,
        LatestOrCurrentClickGetChatFromID
      );
    }
  }, [LatestOrCurrentClickGetChatFromID]);

  const first_interaction_with_chat_create_new_room_by_default = async () => {
    const formData = {};
    const resp = await postData(
      formData,
      BACKEND_URL + BACK_END_API_CHAT_ROOM,
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      get_title_of_chat_room_first(BACKEND_URL + BACK_END_API_CHAT_ROOM);
    }
  };

  const get_title_of_chat_room_first = async (url) => {
    const resp = await fetchData(url, AUTH_TOKEN);
    if (resp.status == 200) {
      setChatTitleForSideBar(resp.data);
      if (resp.data.length <= 0) {
        first_interaction_with_chat_create_new_room_by_default();
      }
      if (resp.data.length > 0) {
        setLatestOrCurrentClickGetChatFromID(resp.data[0]["id"]);
      }
    } else {
      navigate("/");
    }
  };
  const _title_change_but_not_the_chatting_ui_ = async (url) => {
    const resp = await fetchData(url, AUTH_TOKEN);
    if (resp.status == 200) {
      setChatTitleForSideBar(resp.data);
    } else {
      navigate("/");
    }
  };
  const get_title_of_chat_room = async (url) => {
    const resp = await fetchData(url, AUTH_TOKEN);
    if (resp.status == 200) {
      setChatTitleForSideBar(resp.data);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    get_title_of_chat_room_first(BACKEND_URL + BACK_END_API_CHAT_ROOM);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event) => {
    setPopStat(popRef.current);
  };

  const handlePopoverClose = (event) => {
    setPopStat(null);
  };

  const openPop = Boolean(popStat);
  const id = openPop ? "simple-popover" : undefined;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [AllChatText]);

  const submitChatText = async () => {
    if (ChatText === "") {
      notifyerror("you need to say somethings");
      return false;
    }
    setLoading(true);

    // =================Initial chat without data==============================
    if (AllChatText.length <= 0) {
      // if there is tone selected for chat
      let InTone = ``;
      if (selectedSummarizes) {
        selectedSummarizes.forEach((item) => {
          InTone += `[Generate In Tone:${item.value}]`;
        });
      } else {
        InTone = "Default";
      }
      if (ChatText) {
        setChatText("");
        setAfterTypeDontShowIni(true);
        setCurrentQuestionIni(ChatText);
        if (divRef.current) {
          divRef.current.focus();
        }
        const formdata = {
          question: ChatText,
          Tone: InTone,
          chat_root: IdOfTopTitleChat,
        };
        const resp = await postData(
          formdata,
          BACKEND_URL + BACK_END_API_CHAT_ASK_QUESTION + "/",
          AUTH_TOKEN
        );
        if (resp.status == 201) {
          setCurrentQuestionIni(null);
          const data = {
            content: resp.data[0]["content"],
            question: resp.data[0]["question"],
          };
          setCurrentAnswerIni((CurrentAnswerIni) => [
            ...CurrentAnswerIni,
            data,
          ]);
          setChatText("");
          if(resp.data[0]["content"]=="upgrade a plan"){
            
            dispatch(_save_details_(upgrade_plan))
          }
        } else {
          // notifyerror("something went wrong");
        }
        // setLoading(false);
        setcheck_to_stop_typing(true)
        return true;
      }
    }

    // =================Initial chat without data==============================

    // =================Initial chat with data or after there is some data==============================
    if (ChatText) {
      setChatText("");

      // if there is tone selected for chat
      let InTone = ``;
      if (selectedSummarizes) {
        selectedSummarizes.forEach((item) => {
          InTone += `[Generate In Tone:${item.value}]`;
        });
      } else {
        InTone = "Default";
      }
      setCurrentQuestion(ChatText);
      if (divRef.current) {
        divRef.current.focus();
      }
      const formdata = {
        question: ChatText,
        Tone: InTone,
        chat_root: IdOfTopTitleChat,
      };
      const resp = await postData(
        formdata,
        BACKEND_URL + BACK_END_API_CHAT_ASK_QUESTION + "/",
        AUTH_TOKEN
      );
      if (resp.status == 201) {
        setCurrentQuestion(null);
        const data = {
          content: resp.data[0]["content"],
          question: resp.data[0]["question"],
        };
        setCurrentAnswer((CurrentAnswer) => [...CurrentAnswer, data]);
        setChatText("");
        if(resp.data[0]["content"]=="upgrade a plan"){
          // dispatch(_save_details_(upgrade_plan))
          navigate("/settings/subscription_plan?message=upgrade")
        }
      } else {
        // notifyerror("something went wrong");
      }
    }
    // =================Initial chat with data or after there is some data==============================
    // setLoading(false);
    setcheck_to_stop_typing(true)
  };

  // useEffect(() => {
  //   console.log("CurrentAnswer", CurrentAnswer);
  // }, [CurrentAnswer]);

  // useEffect(() => {
  //   get_initial_chat();
  // }, []);

  useEffect(() => {
    if (chatLoadingRef.current) {
      chatLoadingRef.current.focus();
    }
  }, [CurrentQuestionIni]);

  useEffect(() => {
    if (chatLoadingRef.current) {
      chatLoadingRef.current.focus();
    }
  }, [CurrentQuestion]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [initialTitle, setInitialTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setInitialTitle(ChatTitleForSideBar[index].title);
  };

  const handleInputChange = (index, event) => {
    const updatedTitle = event.target.value;
    setChatTitleForSideBar((prevTitles) => {
      const updatedTitles = [...prevTitles];
      updatedTitles[index].title = updatedTitle;
      return updatedTitles;
    });
  };

  const handleInputBlur = async (index) => {
    if (ChatTitleForSideBar[index].title !== initialTitle) {
      // console.log('Title changed:', ChatTitleForSideBar[index].title, 'ID:', ChatTitleForSideBar[index].id);
      const fromData = {
        title: ChatTitleForSideBar[index].title,
      };
      const resp = await patchData(
        fromData,
        BACKEND_URL +
          BACK_END_API_CHAT_ROOM +
          ChatTitleForSideBar[index].id +
          "/",
        AUTH_TOKEN
      );
    }
    setEditingIndex(null);
    setInitialTitle("");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    get_title_of_chat_room(
      BACKEND_URL + BACK_END_API_CHAT_ROOM + "?search=" + value
    );
  };

  const handleDelete = (id) => {
    setChatTitleForSideBar((prevtitledata) =>
      prevtitledata.filter((titledata) => titledata.id !== id)
    );
  };

  const _update_document_data = async (data, id, message) => {
    handleDelete(id);
    const resp = await deleteData(
      BACKEND_URL + BACK_END_API_CHAT_ROOM + id + "/",
      AUTH_TOKEN
    );
  };

  const call_api_change_title = async (newTitle) => {
    const fromData = {
      title: newTitle,
    };
    const resp = await patchData(
      fromData,
      BACKEND_URL + BACK_END_API_CHAT_ROOM + IdOfTopTitleChat + "/",
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      _title_change_but_not_the_chatting_ui_(
        BACKEND_URL + BACK_END_API_CHAT_ROOM
      );
    }
  };

  const TitleChage = (event) => {
    setTitleOfChat(event.target.value);
  };

  const TitleInputKeyPressed = (event) => {
    if (event.key === "Enter") {
      call_api_change_title(TitleOfChat);
    }
  };

  const mousemovedawayfrominput = () => {
    call_api_change_title(TitleOfChat);
  };

  const renderHTMLDataForChatting = (htmldata) => {
    const formattedContent = htmldata
      .split("\n")
      .map((line, index) => (index === 0 ? line : `<br>${line}`))
      .join("");

    return formattedContent;
  };

  const [Chat_Template_Title, setChat_Template_Title] = useState(null);
  const [second_layer_title, setsecond_layer_title] = useState(null);
  const [value_of_template_to_use, setvalue_of_template_to_use] =
    useState(null);

  const [show_only_custom, set_show_only_custom] = useState(true);
  const [custome_chat_template, setcustome_chat_template] = useState(null);
  // const [customDescription, setCustomDescription] = useState('');

  const [innervalueofcustomechattemplate, setinnervalueofcustomechattemplate] =
    useState("");
  const [
    previousinnervalueofcustomechattemplate,
    setpreviousinnervalueofcustomechattemplate,
  ] = useState("");
  const [
    show_button_to_edit_text_area_description,
    setshow_button_to_edit_text_area_description,
  ] = useState(false);
  const [descriptionid, setdescriptionid] = useState(null);

  const [show_create_input, setshow_create_input] = useState(false);

  //udpate description from textarea using id
  const update_the_description = async () => {
    let formData = {
      description: innervalueofcustomechattemplate,
    };
    const resp = await patchData(
      formData,
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE + descriptionid + "/",
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      notifysucces("Description updated");
    } else {
      notifyerror("something went wrong");
    }
    setshow_button_to_edit_text_area_description(false);
  };

  const handleChangeDescriptions = (e) => {
    if (innervalueofcustomechattemplate == "") {
      return true;
    }
    setshow_button_to_edit_text_area_description(true);
    setinnervalueofcustomechattemplate(e.target.value);
  };

  const get_first_chat_template_title = async () => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_API_FIRST_CHAT_TEMPLATE,
      AUTH_TOKEN
    );
    if ((resp.status = 200)) {
      setChat_Template_Title(resp.data);
    }
  };

  const get_first_custom_chat_template_title = async () => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE,
      AUTH_TOKEN
    );
    if ((resp.status = 200)) {
      setcustome_chat_template(resp.data);
    }
  };

  const second_layer_template = async (id) => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_API_FIRST_CHAT_TEMPLATE + id + "/",
      AUTH_TOKEN
    );
    if ((resp.status = 200)) {
      setsecond_layer_title(resp.data.second_title);
    }
  };
  const get_value_of_template = async (id) => {
    try {
      const resp = await fetchData(
        BACKEND_URL + BACK_END_API_VALUE_OF_CHAT_TEMPLATE + id + "/",
        AUTH_TOKEN
      );

      if (resp.status === 200) {
        const innerValueData = resp.data.inner_value_data;

        if (
          innerValueData &&
          Array.isArray(innerValueData) &&
          innerValueData.length > 0
        ) {
          const valueOfPrompt = innerValueData[0].value_of_prompt;
          if (valueOfPrompt) {
            setvalue_of_template_to_use(valueOfPrompt);
          } else {
            notifymessage("comming soon");
          }
        } else {
          notifymessage("comming soon");
        }
      } else {
        notifymessage("comming soon");
      }
    } catch (error) {
      notifymessage("comming soon");
    }
  };

  const use_choosen_text_to_question = () => {
    setChatText(value_of_template_to_use);
    setOpen(false);
  };
  const use_custome_text = () => {
    setChatText(innervalueofcustomechattemplate);
    setOpen(false);
  };

  useEffect(() => {
    get_first_chat_template_title();
    get_first_custom_chat_template_title();
  }, []);

  // =======create chat template code=============
  const showinputtocreate = () => {
    setshow_create_input(true);
  };

  const [newTitleName, setNewTitleName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleNewTitleNameChange = (e) => {
    setNewTitleName(e.target.value);
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const create_new_template = async () => {
    if (!newTitleName || !newDescription) {
      notifyerror("Title with description is needed");
      return false;
    }
    let formData = {
      title: newTitleName,
      description: newDescription,
    };
    const resp = await postData(
      formData,
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE,
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      notifysucces("Template created");
      get_first_custom_chat_template_title();
      setshow_create_input(false);
      setNewTitleName("");
      setNewDescription("");
    } else {
      notifyerror("try again");
    }
  };

  const get_the_inner_value_of_custom_template = async (id) => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE + id + "/",
      AUTH_TOKEN
    );
    if (resp.status == 200) {
      setinnervalueofcustomechattemplate(resp.data.description);
      setpreviousinnervalueofcustomechattemplate(resp.data.description);
      setdescriptionid(resp.data.id);
    }
  };

  // ====================Edit Custom Template==================
  const [
    EditCustomTemplateEditingTitleIndex,
    setEditCustomTemplateEditingTitleIndex,
  ] = useState(null);
  const [EditCustomTemplateEditedTitle, setEditCustomTemplateEditedTitle] =
    useState("");

  const EditCustomTemplateHandleEditClick = (index) => {
    setEditCustomTemplateEditingTitleIndex(index);
    setEditCustomTemplateEditedTitle(custome_chat_template[index].title);
  };

  const EditCustomTemplateHandleTitleChange = (e) => {
    setEditCustomTemplateEditedTitle(e.target.value);
  };

  const EditCustomTemplateHandleSaveClick = async (index, id) => {
    let formData = {
      title: EditCustomTemplateEditedTitle,
    };
    const resp = await patchData(
      formData,
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE + id + "/",
      AUTH_TOKEN
    );
    if (resp.status == 201) {
      get_first_custom_chat_template_title();
      setEditCustomTemplateEditingTitleIndex(null);
      notifysucces("Title updated");
    } else {
      notifyerror("something went wrong");
    }
  };

  const handleDeleteCustomTemplate = (id) => {
    setcustome_chat_template((prevdata) =>
      prevdata.filter((cusdata) => cusdata.id !== id)
    );
  };

  const delete_the_custom_template = async (id) => {
    handleDeleteCustomTemplate(id);
    const resp = await deleteData(
      BACKEND_URL + BACK_END_CUSTOM_CHAT_TEMPLATE + id + "/",
      AUTH_TOKEN
    );
    notifyerror("Template deleted");
  };

  // ============brand Voice===========
  const [brandVoice, setbrandVoice] = useState(null);

  const get_brand_voice_for_chat = async () => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_API_BRAND_VOICE,
      AUTH_TOKEN
    );
    if (resp.status == 200) {
      setbrandVoice(resp.data.results);
    }
  };

  useEffect(() => {
    get_brand_voice_for_chat();
  }, []);

  const [selectedSummarizes, setSelectedSummarizes] = useState([]);
  const [show_summarize_tone, set_show_summarize_tone] = useState(false);

  const handleBrandVoiceChange = (event) => {
    const selectedBrandVoice = event.target.value;
    const brandVoiceItem = brandVoice.find(
      (item) => item.brand_voice === selectedBrandVoice
    );

    if (event.target.checked) {
      setSelectedSummarizes((prevSelectedSummarizes) => [
        ...prevSelectedSummarizes,
        {
          value: brandVoiceItem.content_summarize,
          label: selectedBrandVoice,
        },
      ]);
    } else {
      setSelectedSummarizes((prevSelectedSummarizes) =>
        prevSelectedSummarizes.filter(
          (summary) => summary.label !== selectedBrandVoice
        )
      );
    }
  };

  const handleDeleteClick = (label) => {
    setSelectedSummarizes((prevSelectedSummarizes) =>
      prevSelectedSummarizes.filter((summary) => summary.label !== label)
    );
  };

  // search for chat template
  const [search_chat_template, setSearchChatTemplate] = useState("");

  const search_first_chat_template_title = async (search_data) => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_API_FIRST_CHAT_TEMPLATE + "?search=" + search_data,
      AUTH_TOKEN
    );
    if ((resp.status = 200)) {
      setChat_Template_Title(resp.data);
    }
  };

  const handleChange = (event) => {
    setSearchChatTemplate(event.target.value);
    search_first_chat_template_title(event.target.value);
  };

  // ===============Repeat ask question again==================

  const submitRepeat = async (repeat_ask_question) => {
    setLoading(true);
    // =================Initial chat without data==============================
    if (AllChatText.length <= 0) {
      // if there is tone selected for chat
      let InTone = ``;
      if (selectedSummarizes.length > 0) {
        selectedSummarizes.forEach((item) => {
          InTone += `[Generate In Tone:${item.value}]`;
        });
      } else {
        InTone = "Default";
      }
      if (repeat_ask_question) {
        setAfterTypeDontShowIni(true);
        setCurrentQuestionIni(repeat_ask_question);
        if (divRef.current) {
          divRef.current.focus();
        }
        const formdata = {
          question: repeat_ask_question,
          Tone: InTone,
          chat_root: IdOfTopTitleChat,
        };
        const resp = await postData(
          formdata,
          BACKEND_URL + BACK_END_API_CHAT_ASK_QUESTION + "/",
          AUTH_TOKEN
        );
        if (resp.status == 201) {
          setCurrentQuestionIni(null);
          const data = {
            content: resp.data[0]["content"],
            question: resp.data[0]["question"],
          };
          setCurrentAnswerIni((CurrentAnswerIni) => [
            ...CurrentAnswerIni,
            data,
          ]);
          setChatText("");
          if(resp.data[0]["content"]=="upgrade a plan"){
            
            dispatch(_save_details_(upgrade_plan))
          }
        } else {
          notifyerror("something went wrong");
          setLoading(false);
        }
        setcheck_to_stop_typing(true)
        return true;
      }
    }

    // =================Initial chat without data==============================

    // =================Initial chat with data or after there is some data==============================
    if (repeat_ask_question) {
      // if there is tone selected for chat
      let InTone = ``;
      if (selectedSummarizes.length > 0) {
        selectedSummarizes.forEach((item) => {
          InTone += `Generate In Tone :${item.value}`;
        });
      } else {
        InTone = "Default";
      }
      setCurrentQuestion(repeat_ask_question);
      if (divRef.current) {
        divRef.current.focus();
      }
      const formdata = {
        question: repeat_ask_question,
        Tone: InTone,
        chat_root: IdOfTopTitleChat,
      };
      const resp = await postData(
        formdata,
        BACKEND_URL + BACK_END_API_CHAT_ASK_QUESTION + "/",
        AUTH_TOKEN
      );
      if (resp.status == 201) {
        setCurrentQuestion(null);
        const data = {
          content: resp.data[0]["content"],
          question: resp.data[0]["question"],
        };
        setCurrentAnswer((CurrentAnswer) => [...CurrentAnswer, data]);
        setChatText("");
      } else {
        // notifyerror("something went wrong");
        setLoading(false);
      }
    }
    // =================Initial chat with data or after there is some data==============================
    setcheck_to_stop_typing(true)
  };

  useEffect(() => {
    if (REPEAT_QUESTION != null) {
      submitRepeat(REPEAT_QUESTION);
    }
  }, [REPEAT_QUESTION]);

  // =================adjust the size of textarea================
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    const minHeight = 60; // Minimum height for the textarea
    const maxHeight = 300; // Maximum height for the textarea
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    adjustTextareaHeight(textarea);
  }, [ChatText]);



  // =======typing done=========
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);



  const handleTypingDone = () => {
    setIsTypingFinished(true);
    setLoading(false)
    setcheck_to_stop_typing(false)
  };

  // useEffect(()=>{
  //   console.log(characterCount)
  // },[characterCount])


  const handleStopTyping = () => {
    setIsTypingFinished(false);
    console.log("stope typing")
  };

  return (
    <>
      <div className="z-20 relative sm:fixed top-0 right-0 sm:w-[calc(100%-256px)] -mx-6 sm:mx-0 h-full sm:h-screen flex">
        <div className="flex-auto flex flex-col h-full">
          <div className="sm:w-full bg-white px-4 py-2 lg:px-10 lg:py-5 border border-gray-200 flex gap-2">
            <div className="flex-1 text-xl font-semibold">
              <div>                  
                <input
                    className="w-full truncate bg-transparent outline-none focus:ring pointer-events-auto"
                    type="text"
                    placeholder="Title of Room"
                    data-testid="EditableChatTitle"
                    value={TitleOfChat}
                    onChange={TitleChage}
                    onKeyPress={TitleInputKeyPressed}
                    onBlur={mousemovedawayfrominput}
                  />
              </div>
            </div>
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
              onClick={(e) => setSidebarStatus(!sidebarStatus)}
            >
              <span className="flex items-center justify-center gap-x-2 mx-auto select-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={clsx("w-3 h-3", {
                    "order-last rotate-180": sidebarStatus,
                  })}
                >
                  <path
                    fillRule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{sidebarStatus ? "Hide" : "View"} conversations</span>
              </span>
            </button>
          </div>

          <div className="flex-auto w-full flex-grow flex flex-col h-[calc(100vh-122px)] items-center pt-4 pb-5 overflow-hidden">
            <div className="relative flex flex-col overflow-hidden h-full w-full bg-white grow max-w-[832px]">
              <div className="flex flex-col flex-auto h-full w-full">
                <div className="flex-1 flex max-h-full overflow-x-hidden overflow-y-auto w-full">
                  {/* =================chat data initially================== */}

                  {AllChatText &&
                    (AllChatText.length > 0 ? (
                      <div
                        ref={chatContainerRef}
                        className="flex-1 flex flex-col item-start bg-white ml-auto mr-auto rounded-md p-3 text-sm overflow-y-auto"
                      >
                        {/* Chat messages */}
                        {AllChatText.map((chat_data, index) => (
                          <div key={index} className="flex flex-col mb-3 mt-4">
                            {/* User */}
                            <div className="relative flex flex-col items-end">
                              <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="default.png"
                                  alt="User"
                                />
                              </div>
                              <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                <RenderHtmlData htmldata={chat_data.question} />
                              </div>
                            </div>

                            {/* Bot */}
                            <div className="relative flex flex-col">
                              <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="chat.png"
                                  alt="ChatBot"
                                />
                              </div>
                              <div className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl">
                                <RenderHtmlData htmldata={chat_data.content} />
                                {/* ============all sorts of btn================ */}
                                <Differentbtn
                                  all_data={chat_data}
                                  data={chat_data.content}
                                />
                                {/* ============all sorts of btn================ */}
                              </div>
                            </div>
                          </div>
                        ))}

                        {CurrentAnswer.length > 0 ? (
                          <>
                            {(() => {
                              let length_of_obj = CurrentAnswer.length;
                              const data_ = renderHTMLDataForChatting(
                                CurrentAnswer[length_of_obj - 1]["content"]
                              );
                              return CurrentAnswer.map((data, index) => (
                                <div
                                  className="flex flex-col mb-3 mt-4"
                                  key={index}
                                >
                                  <div className="relative flex flex-col items-end">
                                    <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="default.png"
                                        alt="User"
                                      />
                                    </div>
                                    <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                      <RenderHtmlData htmldata={data["question"]} />
                                    </div>
                                  </div>

                                  <div className="relative flex flex-col">
                                    <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="chat.png"
                                        alt="ChatBot"
                                      />
                                    </div>
                                    <div
                                      className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                      tabIndex={0}
                                      ref={divRef}
                                    >
                                      {CurrentAnswer.length == length_of_obj ? (
                                        <>
                                          <Typed
                                            strings={[data_]}
                                            typeSpeed={1}
                                            showCursor={true}
                                            onComplete={handleTypingDone}
                                          />
                                        </>
                                      ) : (
                                        <RenderHtmlData
                                          htmldata={data["content"]}
                                        />
                                      )}
                                      {/* ============all sorts of btn================ */}
                                      <Differentbtn
                                        all_data={data}
                                        data={data_}
                                      />
                                      {/* ============all sorts of btn================ */}
                                    </div>
                                  </div>
                                </div>
                              ));
                            })()}
                          </>
                        ) : null}

                        {CurrentQuestion ? (
                          <div className="flex flex-col mb-3 mt-4">
                            <div className="relative flex flex-col items-end">
                              <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="default.png"
                                  alt="User"
                                />
                              </div>
                              <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                <RenderHtmlData htmldata={CurrentQuestion} />
                              </div>
                            </div>

                            {/* Bot */}
                            <div className="relative flex flex-col">
                              <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="chat.png"
                                  alt="ChatBot"
                                />
                              </div>
                              <div
                                className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                tabIndex={0}
                                ref={chatLoadingRef}
                              >
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      cx="18"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin=".67"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin=".33"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                    <circle
                                      cx="6"
                                      cy="12"
                                      r="0"
                                      fill="currentColor"
                                    >
                                      <animate
                                        attributeName="r"
                                        begin="0"
                                        calcMode="spline"
                                        dur="1.5s"
                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                        repeatCount="indefinite"
                                        values="0;2;0;0"
                                      />
                                    </circle>
                                  </svg>
                                </>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <>
                        <div
                          ref={chatContainerRef}
                          className="flex-1 flex flex-col item-start bg-white ml-auto mr-auto rounded-md p-3 text-sm overflow-y-auto"
                        >
                          {CurrentAnswerIni.length > 0 ? (
                            <>
                              {(() => {
                                let length_of_obj = CurrentAnswerIni.length;
                                const data_ = renderHTMLDataForChatting(
                                  CurrentAnswerIni[length_of_obj - 1]["content"]
                                );
                                return CurrentAnswerIni.map((data, index) => (
                                  <div
                                    className="flex flex-col mb-3 mt-4"
                                    key={index}
                                  >
                                    <div className="relative flex flex-col items-end">
                                      <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                        <img
                                          className="w-full h-full rounded-full"
                                          src="default.png"
                                          alt="User"
                                        />
                                      </div>
                                      <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                        <RenderHtmlData
                                          htmldata={data["question"]}
                                        />
                                      </div>
                                    </div>

                                    <div className="relative flex flex-col">
                                      <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                        <img
                                          className="w-full h-full rounded-full"
                                          src="chat.png"
                                          alt="ChatBot"
                                        />
                                      </div>
                                      <div
                                        className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                        tabIndex={0}
                                        ref={divRef}
                                      >
                                        {CurrentAnswerIni.length ==
                                        length_of_obj ? (
                                          <>
                                            <Typed
                                              strings={[data_]}
                                              typeSpeed={1}
                                              showCursor={true}
                                              onComplete={handleTypingDone}
                                            />
                                          </>
                                        ) : (
                                          <RenderHtmlData
                                            htmldata={data["content"]}
                                          />
                                        )}
                                        {/* ============all sorts of btn================ */}
                                        <Differentbtn
                                          all_data={data}
                                          data={data["content"]}
                                        />
                                        {/* ============all sorts of btn================ */}
                                      </div>
                                    </div>
                                  </div>
                                ));
                              })()}
                            </>
                          ) : null}

                          {CurrentQuestionIni ? (
                            <div className="flex flex-col mb-3 mt-4">
                              <div className="relative flex flex-col items-end">
                                <div className="w-6 h-6 rounded-full order-last overflow-hidden">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="default.png"
                                    alt="User"
                                  />
                                </div>
                                <div className="text-white bg-blue px-4 py-3 mx-4 rounded-2xl">
                                  <RenderHtmlData htmldata={CurrentQuestionIni} />
                                </div>
                              </div>

                              {/* Bot */}
                              <div className="relative flex flex-col">
                                <div className="w-7 h-7 mt-2 rounded-full order-last overflow-hidden">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="chat.png"
                                    alt="ChatBot"
                                  />
                                </div>
                                <div
                                  className="text-black bg-blue-800 outline-none px-4 py-3 mx-4 md:max-w-[90%] rounded-2xl"
                                  tabIndex={0}
                                  ref={chatLoadingRef}
                                >
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30"
                                      height="30"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        cx="18"
                                        cy="12"
                                        r="0"
                                        fill="currentColor"
                                      >
                                        <animate
                                          attributeName="r"
                                          begin=".67"
                                          calcMode="spline"
                                          dur="1.5s"
                                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                          repeatCount="indefinite"
                                          values="0;2;0;0"
                                        />
                                      </circle>
                                      <circle
                                        cx="12"
                                        cy="12"
                                        r="0"
                                        fill="currentColor"
                                      >
                                        <animate
                                          attributeName="r"
                                          begin=".33"
                                          calcMode="spline"
                                          dur="1.5s"
                                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                          repeatCount="indefinite"
                                          values="0;2;0;0"
                                        />
                                      </circle>
                                      <circle
                                        cx="6"
                                        cy="12"
                                        r="0"
                                        fill="currentColor"
                                      >
                                        <animate
                                          attributeName="r"
                                          begin="0"
                                          calcMode="spline"
                                          dur="1.5s"
                                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                          repeatCount="indefinite"
                                          values="0;2;0;0"
                                        />
                                      </circle>
                                    </svg>
                                  </>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {AfterTypeDontShowIni ? null : (
                            <div className="flex flex-auto flex-col items-center justify-center">
                              <div className="py-10 text-center">
                                <img
                                  src="chat-hero.png"
                                  className="w-64 mb-8"
                                  alt="Chat Hero"
                                />
                                <h2 className="text-2xl font-bold mb-8">
                                  AI Chat
                                </h2>
                                <p className="text-sm font-medium leading-none max-w-[300px]">
                                  Choose a prompt below or write your own to
                                  start chatting with our Best AI.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  {/* ====================================================== */}
                </div>
                <div
                  ref={popRef}
                  className="chatbox flex flex-col w-full py-2 px-4 @lg:py-4 max-w-7xl m-auto"
                >
                  <div className="p-2 bg-gray-50 w-full flex items-center rounded-t-xl">
                    <button
                      className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                      onClick={handleClickOpen}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-grey-600 group-hover:text-grey-700"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 13V5.74264C13 5.47742 12.8946 5.22307 12.7071 5.03553L9.96447 2.29289C9.77693 2.10536 9.52258 2 9.25736 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13ZM4 0C2.34315 0 1 1.34315 1 3V13C1 14.6569 2.34315 16 4 16H12C13.6569 16 15 14.6569 15 13V5.74264C15 4.94699 14.6839 4.18393 14.1213 3.62132L11.3787 0.87868C10.8161 0.316071 10.053 0 9.25736 0H4ZM5 10C5 9.44771 5.44772 9 6 9H9C9.55228 9 10 9.44771 10 10C10 10.5523 9.55228 11 9 11H6C5.44772 11 5 10.5523 5 10ZM6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7H8C8.55229 7 9 6.55228 9 6C9 5.44772 8.55229 5 8 5H6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p  className="text-[15px] font-semibold" >Browse prompts</p>
                    </button>
                    <button
                      className="group inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md duration-300 hover:bg-blue-900 hover:text-grey-900 focus:shadow-none"
                      onClick={handlePopoverOpen}
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3.28,8.68c-.3,.46-.47,1-.47,1.59,0,1.63,1.34,2.95,2.99,2.95s2.92-1.25,2.99-2.83"
                          fill="none"
                          stroke="#1C64F2"
                          strokeWidth={1}
                        />
                        <path
                          d="M12.61,11.58L2.53,8.45C.39,7.79,.39,4.75,2.53,4.09L12.61,.96c.22-.07,.45-.12,.67-.05,2.39,.79,2.39,9.92,0,10.72-.22,.07-.45,.02-.67-.05Z"
                          fill="none"
                          stroke="#1C64F2"
                          strokeWidth={1}
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p  className="text-[15px] font-semibold" >Browse voice</p>

                    </button>
                    {/* ==================Tone to show=================== */}
                    {show_summarize_tone ? (
                      <>
                        {selectedSummarizes.map((data, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="text-xs font-medium rounded-full py-1 border ml-2 px-3 border-gray-200 bg-white flex items-center"
                              >
                                <div className="mr-2 w-3 h-3 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-name="Layer 1"
                                    viewBox="0 0 100 125"
                                    x="0px"
                                    y="0px"
                                  >
                                    <path d="M12.54,71a33.93,33.93,0,0,0,6.29,3.3L17.18,92a2.5,2.5,0,0,0,2.26,2.72h.24a2.5,2.5,0,0,0,2.49-2.27L23.7,75.88c1.11.28,2.23.54,3.4.74a55.44,55.44,0,0,0,9.46.83q2.31,0,4.57-.21a9.78,9.78,0,0,0,8.61-12,10.6,10.6,0,0,1,.56-2.92L50.79,61a4.5,4.5,0,0,0-.26-3.56,4.41,4.41,0,0,0-2.72-2.21c-3.85-1.06-6.24-3.06-6.93-5.77A36.38,36.38,0,0,0,52.72,49a2.5,2.5,0,0,0,1.92-2.32L55,39.58a14.33,14.33,0,0,0,6-3.23,6.58,6.58,0,0,0,1.43-7.72,8,8,0,0,0-3.06-3.11,15,15,0,0,1-6.91-13.24,40.5,40.5,0,0,0,0-4.67,2.5,2.5,0,0,0-5,.34,35.3,35.3,0,0,1,0,4.1A19.91,19.91,0,0,0,56.59,29.7a4.25,4.25,0,0,1,1.31,1.11,1.61,1.61,0,0,1-.34,1.88A10.56,10.56,0,0,1,52.1,35.1,2.5,2.5,0,0,0,50,37.46l-.31,7a32.38,32.38,0,0,1-8.49,0,4.79,4.79,0,0,0-5.32,5.74c.56,2.67,2.6,7.42,10,9.67l-.3.86a13.87,13.87,0,0,0-.79,5.3,2.61,2.61,0,0,0,.06.31,4.79,4.79,0,0,1-.72,4,4.74,4.74,0,0,1-3.45,2A48.51,48.51,0,0,1,28,71.69a32.42,32.42,0,0,1-12.63-4.84A17,17,0,0,1,9.56,61a2.5,2.5,0,0,0-4.42,2.33A21.87,21.87,0,0,0,12.54,71Z" />
                                    <path d="M60.38,61.69a2.5,2.5,0,1,0,2.68,4.22,12.4,12.4,0,0,0,4.22-16.36,2.5,2.5,0,1,0-4.39,2.4A7.39,7.39,0,0,1,60.38,61.69Z" />
                                    <path d="M70.83,76a2.49,2.49,0,0,0,1.56-.55A25.64,25.64,0,0,0,80,45.73a2.5,2.5,0,0,0-4.62,1.91,20.62,20.62,0,0,1-6.16,23.88A2.5,2.5,0,0,0,70.83,76Z" />
                                    <path d="M89.42,40.31A2.5,2.5,0,0,0,88,43.54a33.73,33.73,0,0,1-9.71,37.63A2.5,2.5,0,1,0,81.49,85,38.74,38.74,0,0,0,92.64,41.76,2.5,2.5,0,0,0,89.42,40.31Z" />
                                  </svg>
                                </div>
                                <div className="truncate text-ellipsis max-w-[4rem] @md:max-w-[40rem]">
                                  {data.label}
                                </div>
                                <div
                                  className="ml-2 w-2.5 h-2.5 flex items-center justify-center cursor-pointer"
                                  onClick={() => handleDeleteClick(data.label)}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M14.87,14.87L1.13,1.13"
                                      fill="none"
                                      stroke="#0D121C"
                                      strokeWidth="1"
                                      strokeLinecap="round"
                                    ></path>
                                    <path
                                      d="M1.13,14.87L14.87,1.13"
                                      fill="none"
                                      stroke="#0D121C"
                                      strokeWidth="1"
                                      strokeLinecap="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                    {/* ==================Tone to show=================== */}
                  </div>

                  <div className="inputbox relative">
                    <textarea
                      className="w-full py-4 pl-4 pr-12 border border-border rounded-b-xl placeholder-text-black placeholder-opacity-100 placeholder-font-semibold focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:border-blue resize-none overflow-y-auto min-h-14"
                      type="text"
                      rows="1"
                      placeholder="Ask or Search anything"
                      value={ChatText || chatFill}
                      onChange={(e) => {
                        setChatText(e.target.value);
                        adjustTextareaHeight(e.target);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitChatText();
                        }
                      }}
                    />
                   
                    {check_to_stop_typing
                    ?
                        <button
                          className="absolute bottom-4 right-4 w-6 h-6"
                         onClick={handleStopTyping}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="18" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin=".67"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                            <circle cx="12" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin=".33"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                            <circle cx="6" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin="0"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                          </svg>
                         </button>
                    :
                      <>
                      <button
                        className="absolute bottom-4 right-4 w-6 h-6"
                        onClick={() => {
                          submitChatText();
                          setChatFill("");
                        }}
                      >
                        {Loading ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="18" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin=".67"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                            <circle cx="12" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin=".33"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                            <circle cx="6" cy="12" r="0" fill="currentColor">
                              <animate
                                attributeName="r"
                                begin="0"
                                calcMode="spline"
                                dur="1.5s"
                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                repeatCount="indefinite"
                                values="0;2;0;0"
                              />
                            </circle>
                          </svg>
                        ) : (
                          <svg
                            className="w-full h-full"
                            width="36"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6939 4.15669C21.6939 4.15669 21.6939 4.16607 21.6939 4.17075L16.2376 22.1651C16.155 22.4574 15.985 22.7174 15.7504 22.9103C15.5158 23.1032 15.2278 23.2197 14.9251 23.2442C14.882 23.2479 14.8389 23.2498 14.7957 23.2498C14.512 23.2507 14.234 23.1704 13.9945 23.0184C13.7549 22.8664 13.5639 22.6491 13.4439 22.392L10.0961 15.3242C10.063 15.2543 10.0524 15.1758 10.0656 15.0996C10.0789 15.0234 10.1154 14.9532 10.1701 14.8986L15.5382 9.5295C15.673 9.38771 15.7469 9.1989 15.7444 9.00332C15.7419 8.80775 15.6631 8.6209 15.5248 8.4826C15.3865 8.34429 15.1997 8.26549 15.0041 8.26299C14.8085 8.26048 14.6197 8.33448 14.4779 8.46919L9.10137 13.8373C9.04672 13.892 8.97649 13.9285 8.90029 13.9418C8.8241 13.9551 8.74566 13.9444 8.67574 13.9114L1.64449 10.5804C1.36835 10.4539 1.13595 10.2483 0.97674 9.98963C0.817528 9.73095 0.738657 9.43085 0.750116 9.12732C0.765386 8.81535 0.878328 8.51607 1.07297 8.2718C1.26762 8.02752 1.53412 7.85061 1.8348 7.76607L19.8292 2.30982H19.8432C20.0994 2.23784 20.3702 2.23531 20.6277 2.30251C20.8852 2.3697 21.1202 2.50419 21.3085 2.69217C21.4969 2.88016 21.6319 3.11487 21.6996 3.37224C21.7673 3.6296 21.7653 3.90034 21.6939 4.15669Z"
                              fill="#1D43FF"
                            />
                          </svg>
                        )}
                      </button>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "z-10 absolute top-[50px] sm:top-0 -right-0 h-[calc(100%-50px)] sm:h-full sm:relative w-60 max-w-screen bg-gray-50 flex flex-col duration-300",
            {
              "sm:hidden !-right-full": !sidebarStatus,
            }
          )}
        >
          <div className="p-4 pb-2">
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0 w-full"
              onClick={() => {
                create_new_room_for_chat();
              }}
            >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                + New chat conversation
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center h-full flex-1">
            <div className="w-full p-2 flex flex-col">
              <div className="space-y-1.5 w-full">
                <label
                  htmlFor="search-chat-threads"
                  className="text-sm font-medium block text-gray-900 placeholder:text-gray-400 transition-[color] duration-150 ease-in-out"
                >
                  <span className="flex items-center space-x-1">
                    <span />
                  </span>
                </label>
                <div className="py-1 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                  <div className="flex items-center grow gap-2 py-1.5">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.11,15.11l-4-4"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex gap-1 grow">
                      <input
                        id="search-chat-threads"
                        type="search"
                        className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                        placeholder="Search..."
                        defaultValue=""
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =======Title side bar======== */}
            <div className="w-full grow overflow-y-auto flex-1">
              {ChatTitleForSideBar && (
                <>
                  {ChatTitleForSideBar.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer group border-b border-gray-200 flex items-center h-13 bg-gray-100 mt-1 mb-1 hover: bg-[#ffffff]"
                      >
                        <div className="p-4 flex flex-grow justify-between items-center truncate">
                          <div
                            className="truncate text-ellipsis w-full"
                            onClick={() => {
                              get_chat_data_from_side_div_when_click(
                                BACKEND_URL + BACK_END_API_CHAT_DATA,
                                data.id
                              );
                            }}
                          >
                            {editingIndex === index ? (
                              <input
                                className="text-ellipsis p-1 text-[20px] flex-grow text-xs font-semibold w-full truncate  outline-none focus:ring pointer-events-auto"
                                aria-label="Chat title"
                                value={ChatTitleForSideBar[index].title}
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                                onBlur={() => handleInputBlur(index)}
                                onKeyPress={(event) => {
                                  if (event.key === "Enter") {
                                    handleInputBlur(index);
                                  }
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                className="p-1 w-full text-ellipsis flex-grow text-xs font-normal"
                                aria-label="Chat title"
                              >
                                {data.title}
                              </span>
                            )}
                          </div>
                          <div className="sr-only group-hover:not-sr-only flex">
                            {editingIndex === index ? (
                              // Show Save button while editing
                              <>
                                <button
                                  type="button"
                                  className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                  aria-label="Edit conversation title"
                                  onClick={() => handleInputBlur(index)}
                                >
                                  <svg
                                    className="w-6 h-6 mt-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 100 125"
                                    xmlSpace="preserve"
                                  >
                                    <polygon points="38.6,43.2 32.7,48.7 47.7,64.8 81.1,31.4 75.5,25.7 47.9,53.3 " />
                                    <path d="M50,83.4c18.5,0,33.4-15,33.4-33.4h-8C75.4,64,64,75.4,50,75.4S24.6,64,24.6,50S36,24.6,50,24.6l0,0v-8  c-18.5,0-33.4,15-33.4,33.4S31.5,83.4,50,83.4L50,83.4z" />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              // Show Edit button when not editing
                              <>
                                <button
                                  type="button"
                                  className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                  aria-label="Edit conversation title"
                                  onClick={() => handleEditClick(index)}
                                >
                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                                        fill="transparent"
                                      />
                                      <path
                                        d="M6.8,13.68l7.39-7c1.23-1.16,1.13-3.22-.21-4.54-1.31-1.29-3.31-1.38-4.47-.2L2.32,9.28s1.59,.63,2.71,1.73c1.12,1.1,1.76,2.67,1.76,2.67Z"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                  aria-label="Delete conversation"
                                  onClick={() => {
                                    // console.log(data.id)
                                    const formData = {
                                      trash: true,
                                    };
                                    _update_document_data(
                                      formData,
                                      data.id,
                                      "Moved to trash"
                                    );
                                  }}
                                >
                                  <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M.86,4.28H15.14"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.29,7.34v4.73"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9.71,7.34v4.73"
                                        fill="none"
                                        stroke="#0D121C"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {/* =============== */}
          </div>
        </div>
      </div>
      {/* =====================Browse prompts ============ */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-lg max-w-[1088px] mx-auto"
      >
        <DialogContent>
          <div className="mb-4 pr-12 flex w-full items-center justify-start">
            <h3 className="w-52 text-xl font-bold">Prompts</h3>
            <div className="relative w-full text-grey-600 focus-within:text-grey-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                >
                  <g clipPath="url(#clip0_5_371)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7ZM12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.6064 11.1922Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_371">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <input
                type="search"
                className="resize-none rounded border border-blue-900 py-2 pl-10 text-sm text-black shadow-sm w-60 focus:outline-none placeholder-grey-400 transition-all duration-300 focus:w-full focus:border-border focus:ring-0"
                placeholder='Try "Sales" or "Email"'
                autoComplete="off"
                data-hj-allow="true"
                value={search_chat_template} // Use the search_chat_template value here
                onChange={handleChange}
              />
            </div>
            <div
              onClick={handleClose}
              className="absolute top-0 right-0 p-8 cursor-pointer duration-300 hover:opacity-70"
            >
              <GrClose size={16} />
            </div>
          </div>
          <div className="flex w-full items-start justify-start">
            {/* =================the first template name================= */}
            <div className="w-3/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 pt-3 pr-3">
              <div
                className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize hover:bg-blue-900 "
                onClick={() => {
                  set_show_only_custom(true);
                }}
              >
                Custom
              </div>

              <div className="my-4 opacity-40">
                <div className="border-b border-purple-100 h-0 w-full" />
              </div>
              {Chat_Template_Title && (
                <>
                  {Chat_Template_Title.length > 0 ? (
                    <>
                      {Chat_Template_Title.map((data, index) => {
                        return (
                          <>
                            <div key={index}>
                              <div
                                className="mb-1 cursor-pointer truncate rounded-md p-3 capitalize bg-blue-900 hover:bg-blue-900"
                                onClick={() => {
                                  second_layer_template(data.id);
                                  set_show_only_custom(false);
                                }}
                              >
                                {data.description}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </>
              )}
            </div>
            {/* =================the first template name================= */}

            {/* ====================custome template===================== */}

            {show_only_custom ? (
              <>
                <div className="w-4/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 p-3">
                  {show_create_input ? (
                    <>
                      <input
                        type="text"
                        className="mb-2 p-3 text-sm text-black border-purple-100 focus:outline-none w-full resize-none rounded placeholder-grey-400 shadow-sm transition-all duration-300 focus:w-full focus:border-green-700 focus:ring-0"
                        placeholder="Title of Template"
                        autoComplete="off"
                        value={newTitleName}
                        onChange={handleNewTitleNameChange}
                      />
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="open-modal-button w-full transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base  text-white bg-[#334977] ring-0 ring-blue-600 hover:ring-2 active:ring-0 my-2"
                        onClick={showinputtocreate}
                      >
                        <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                          + Create Custom template
                        </span>
                      </button>
                    </>
                  )}
                  {custome_chat_template && (
                    <>
                      {custome_chat_template.length > 0 ? (
                        <>
                          {custome_chat_template.map((data, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="w-full grow overflow-y-auto flex-1"
                                >
                                  <div className="cursor-pointer group border-b mb-1 break-words rounded-md border-2 p-2.5 line-clamp-2 border-blue-800 bg-blue-800">
                                    <div className="flex flex-grow justify-between items-center truncate">
                                      {EditCustomTemplateEditingTitleIndex ===
                                      index ? (
                                        <>
                                          <div className="truncate text-ellipsis w-full">
                                            <input
                                              type="text"
                                              value={
                                                EditCustomTemplateEditedTitle
                                              }
                                              onChange={
                                                EditCustomTemplateHandleTitleChange
                                              }
                                            />
                                          </div>
                                          <div className="sr-only group-hover:not-sr-only flex">
                                            <button
                                              className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                              onClick={() => {
                                                EditCustomTemplateHandleSaveClick(
                                                  index,
                                                  data.id
                                                );
                                              }}
                                            >
                                              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                <svg
                                                  className="w-4 h-4"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                                                    fill="#292D32"
                                                  />
                                                </svg>
                                              </span>
                                            </button>
                                            <button
                                              className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                              onClick={() => {
                                                setEditCustomTemplateEditingTitleIndex(
                                                  null
                                                );
                                              }}
                                            >
                                              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                <svg
                                                  className="w-4 h-4 mt-[2px]"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                  xmlnsSerif="http://www.serif.com/"
                                                  viewBox="0 0 20 25"
                                                  version="1.1"
                                                  xmlSpace="preserve"
                                                  x="0px"
                                                  y="0px"
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  strokeLinejoin="round"
                                                  strokeMiterlimit="2"
                                                >
                                                  <g transform="matrix(1,0,0,1,-350,-30)">
                                                    <path
                                                      d="M360,42.472L367.528,50L370,47.528L362.472,40L370,32.472L367.528,30L360,37.528L352.472,30L350,32.472L357.528,40L350,47.528L352.472,50L360,42.472Z"
                                                      fillRule="nonzero"
                                                    />
                                                  </g>
                                                </svg>
                                              </span>
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            className="truncate text-ellipsis w-full"
                                            onClick={() => {
                                              get_the_inner_value_of_custom_template(
                                                data.id
                                              );
                                            }}
                                          >
                                            {data.title}
                                          </div>
                                          <div className="sr-only group-hover:not-sr-only flex">
                                            <button
                                              type="button"
                                              className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                              onClick={() =>
                                                EditCustomTemplateHandleEditClick(
                                                  index
                                                )
                                              }
                                            >
                                              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                <svg
                                                  className="w-4 h-4"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path
                                                    d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                                                    fill="transparent"
                                                  ></path>
                                                  <path
                                                    d="M6.8,13.68l7.39-7c1.23-1.16,1.13-3.22-.21-4.54-1.31-1.29-3.31-1.38-4.47-.2L2.32,9.28s1.59,.63,2.71,1.73c1.12,1.1,1.76,2.67,1.76,2.67Z"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M1.74,14.99l5.05-1.3s-.64-1.57-1.76-2.67c-1.12-1.1-2.71-1.74-2.71-1.74L.99,14.23c-.12,.43,.32,.87,.75,.76Z"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="transition-all duration-200 relative font-semibold shadow-sm hover:outline-none focus:outline-none px-2 py-1 text-xs text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                                              onClick={() => {
                                                delete_the_custom_template(
                                                  data.id
                                                );
                                              }}
                                            >
                                              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                                                <svg
                                                  className="w-4 h-4"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path
                                                    d="M.86,4.28H15.14"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                  ></path>
                                                  <path
                                                    d="M13.13,4.28H2.86c-.17,3-.16,5.97,.28,8.95,.17,1.1,1.11,1.91,2.22,1.91h5.26c1.11,0,2.06-.81,2.22-1.91,.45-2.98,.45-5.95,.28-8.95Z"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M5.14,4.28v-.57c0-.76,.3-1.48,.84-2.02,.53-.54,1.26-.84,2.02-.84s1.48,.3,2.02,.84c.53,.54,.83,1.26,.83,2.02v.57"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M6.29,7.34v4.73"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                  <path
                                                    d="M9.71,7.34v4.73"
                                                    fill="none"
                                                    stroke="#0D121C"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : null}
                    </>
                  )}
                </div>
                {/* ====================custome template===================== */}
              </>
            ) : (
              <>
                {/* =================the second layer template name================= */}
                <div className="w-4/12 h-[500px] self-stretch overflow-scroll border-r border-purple-100 p-3">
                  {second_layer_title && (
                    <>
                      {Chat_Template_Title.length > 0 ? (
                        <>
                          {second_layer_title.map((data, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="mb-1 cursor-pointer break-words rounded-md border-2 p-2.5 line-clamp-2 border-blue-800 bg-blue-800"
                                  onClick={() => {
                                    get_value_of_template(data.id);
                                  }}
                                >
                                  {data.chat_first_step_template_name}
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <LoadingPage />
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* =================the second layer template name================= */}
              </>
            )}

            {show_only_custom ? (
              <>
                {show_create_input ? (
                  <div className="w-5/12 h-[500px] flex flex-col items-end self-stretch border-r border-purple-100 pt-3 pl-3">
                    <div className="relative w-full h-full rounded-md whitespace-pre-wrap text-gray-500 bg-blue-900 p-3 mb-3 overflow-y-scroll">
                      <div className="editor-textarea h-full w-full">
                        <div
                          style={{
                            maxHeight: 400,
                            minHeight: 300,
                            height: "100%",
                          }}
                          className="focus:outline-none focus:expand no-scrollbar mb-2 w-full resize-none overflow-scroll rounded text-left text-grey-500 placeholder-purple-300 shadow-none  transition-all duration-300 focus:w-full focus:border-green-700 focus:ring-0 focus:ring-transparent"
                          id="custom-prompt-editor-preview"
                        >
                          <div
                            translate="no"
                            className="ProseMirror [&_p]:py-1.5"
                            contentEditable="false"
                          >
                            {/* =============typing description=================== */}
                            <textarea
                              className="resize-none w-full h-[90%] p-10 absolute top-0 left-0 border-none bg-transparent focus:outline-none"
                              placeholder="Create your own template
                                  Start typing..."
                              value={newDescription}
                              onChange={handleNewDescriptionChange}
                            />
                            {/* =============typing description=================== */}
                          </div>
                        </div>
                        <div className="flex w-full flex-row justify-between">
                          <div />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* ====================Third layer which is value of chat template============ */}

                    <div className="w-5/12 h-[500px] flex flex-col items-end self-stretch border-r border-purple-100 pt-3 pl-3">
                      <div className="relative w-full h-full rounded-md whitespace-pre-wrap text-gray-500 bg-blue-900 p-3 mb-3 overflow-y-scroll">
                        <span className="text-red-500 font-semibold text-[20px] sticky top-0 z-50 flex w-full overflow-y-scroll whitespace-pre-wrap bg-blue-900 pb-2 text-xs text-black/30">
                          Edit or Use ( Template )
                          <div
                            className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-transparent text-xs font-bold text-grey-200"
                            role="button"
                          >
                            i
                          </div>
                        </span>
                        <div className="editor-textarea h-full w-full">
                          <div
                            style={{
                              maxHeight: 400,
                              minHeight: 300,
                              height: "100%",
                            }}
                            className="focus:outline-none focus:expand no-scrollbar mb-2 w-full resize-none overflow-scroll rounded text-left text-grey-500 placeholder-purple-300 shadow-none  transition-all duration-300 focus:w-full focus:border-green-700 focus:ring-0 focus:ring-transparent"
                            id="custom-prompt-editor-preview"
                          >
                            <div
                              translate="no"
                              className="ProseMirror [&_p]:py-1.5"
                              contentEditable="false"
                            >
                              {/* =============typing description=================== */}
                              {innervalueofcustomechattemplate == "" ? null : (
                                <textarea
                                  className="resize-none w-full h-[90%] p-10 absolute top-0 left-0 border-none bg-transparent focus:outline-none"
                                  value={innervalueofcustomechattemplate}
                                  onChange={handleChangeDescriptions}
                                  placeholder="Your custome template
                                Start typing..."
                                />
                              )}
                              {/* =============typing description=================== */}
                            </div>
                          </div>
                          <div className="flex w-full flex-row justify-between">
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ====================Third layer which is value of chat template End========= */}
                  </>
                )}
              </>
            ) : (
              <>
                {/* ====================Third layer which is value of chat template============ */}

                <div className="w-5/12 h-[500px] flex flex-col items-end self-stretch border-r border-purple-100 pt-3 pl-3">
                  <div className="relative w-full h-full rounded-md whitespace-pre-wrap text-gray-500 bg-blue-900 p-3 mb-3 overflow-y-scroll">
                    <span className="text-red-500 sticky top-0 z-50 flex w-full overflow-y-scroll whitespace-pre-wrap bg-blue-900 pb-2 text-xs text-black/30">
                      PREVIEW (Template)
                      <div
                        className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-transparent text-xs font-bold text-grey-200"
                        role="button"
                      >
                        i
                      </div>
                    </span>
                    <div className="editor-textarea h-full w-full">
                      <div
                        style={{
                          maxHeight: 400,
                          minHeight: 300,
                          height: "100%",
                        }}
                        className="focus:outline-none focus:expand no-scrollbar mb-2 w-full resize-none overflow-scroll rounded text-left text-grey-500 placeholder-purple-300 shadow-none  transition-all duration-300 focus:w-full focus:border-green-700 focus:ring-0 focus:ring-transparent"
                        id="custom-prompt-editor-preview"
                      >
                        <div
                          translate="no"
                          className="ProseMirror [&_p]:py-1.5"
                          contentEditable="false"
                        >
                          {value_of_template_to_use && (
                            <>{value_of_template_to_use}</>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====================Third layer which is value of chat template End========= */}
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {show_create_input ? (
            <>
              <button
                className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-red text-white bg-green-700 px-5"
                onClick={() => {
                  create_new_template();
                }}
              >
                create
              </button>
              <button
                className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-red text-white bg-red-600 px-5"
                onClick={() => {
                  setshow_create_input(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : null}
          {show_button_to_edit_text_area_description ? (
            <>
              <button
                className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-red text-white bg-green-700 px-5"
                onClick={() => {
                  update_the_description();
                }}
              >
                update
              </button>
              <button
                className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-red text-white bg-red-600 px-5"
                onClick={() => {
                  setinnervalueofcustomechattemplate(
                    previousinnervalueofcustomechattemplate
                  );
                  setshow_button_to_edit_text_area_description(false);
                }}
              >
                reset
              </button>
            </>
          ) : null}

          {show_only_custom ? (
            <button
              className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-blue text-white px-5"
              onClick={use_custome_text}
            >
              Use Prompt
            </button>
          ) : (
            <button
              className="focus:outline-none select-none items-center rounded py-3 text-sm font-medium ring-offset-2 focus:ring-2 flex justify-around bg-blue text-white px-5"
              onClick={use_choosen_text_to_question}
            >
              Use Prompt
            </button>
          )}
        </DialogActions>
      </Dialog>

      <Popover
        id={id}
        open={openPop}
        anchorEl={popStat}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="shadow-none"
      >
        <div className="w-[800px] max-w-full border border-grey-300 bg-white shadow-lg md:left-0 rounded-xl">
          <div>
            <div className="px-4 py-5">
              <div className="space-y-1.5 w-full">
                <label htmlFor="search" className="sr-only">
                  <span className="flex items-center space-x-1">
                    <span>Search</span>
                  </span>
                </label>
                <div className="py-1 !mt-0 flex items-center gap-2 bg-white w-full px-3 rounded-lg ring-1 hover:ring-2 transition-all duration-150 ease-in-out ring-gray-200 outline-none focus-within:!ring-1">
                  <div className="flex items-center grow gap-2 py-1.5">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.11,15.11l-4-4"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex gap-1 grow">
                      <input
                        id="search"
                        type="search"
                        className="block w-full text-gray-900 placeholder:text-gray-400 text-sm font-normal resize-none outline-none"
                        placeholder="Search by entry name, tag, or tone"
                        autoComplete="off"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-3 overflow-y-scroll flex items-center no-scrollbar">
              <span className="pr-2 mb-2">
                <button>
                  <div className="inline-block">
                    <div className="text-xs font-medium rounded-full text-gray-900 border py-1 px-3 border-gray-200 bg-white hover hover:bg-gray-100 cursor-pointer">
                      <strong className="font-semibold">
                        <div className="whitespace-nowrap">Tone</div>
                      </strong>
                    </div>
                  </div>
                </button>
              </span>
              {/* <span className="pr-2 mb-2">
                <button>
                  <div className="inline-block">
                    <div
                      className="text-xs font-medium rounded-full text-gray-900 border py-1 px-3 border-gray-200 bg-white hover hover:bg-gray-100 cursor-pointer"
                      style={{}}
                    >
                      <strong className="font-semibold">
                        <div className="whitespace-nowrap">
                          Product information
                        </div>
                      </strong>
                    </div>
                  </div>
                </button>
              </span> */}
            </div>
            <div className="relative inline-block text-left w-full z-auto max-h-[12.875rem] overflow-y-auto overscroll-contain">
              <div>
                <div className="mx-4 text-gray-500 text-xs my-3 pb-2 border-b border-gray-200">
                  TONE
                </div>

                <div className="flex">
                  {brandVoice && (
                    <>
                      {brandVoice.length > 0 ? (
                        <>
                          {brandVoice.map((data, index) => (
                            <div key={index}>
                              <ul className="py-1">
                                <label className="flex text-center items-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 mx-4 px-4 py-2 text-sm cursor-pointer">
                                  <input
                                    data-testid={`menu-item-${data.id}`}
                                    type="checkbox" // Use checkbox instead of radio for multiple selection
                                    id={data.id}
                                    className="form-checkbox focus:ring-blue-500 h-4 w-4 mr-2 text-blue-800 border-gray-300"
                                    value={data.brand_voice}
                                    checked={selectedSummarizes.some(
                                      (item) => item.label === data.brand_voice
                                    )}
                                    onChange={handleBrandVoiceChange}
                                  />
                                  <div className="truncate text-ellipsis max-w-[12rem] @md:max-w-[40rem]">
                                    {data.brand_voice}
                                  </div>
                                  <div className="ml-2">
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.57,7.17h1.71v3.96"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.58,11.13h3.4"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.29,4.25v.37"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </label>
                              </ul>
                            </div>
                          ))}
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
              <div>
                {/* <div className="mx-4 text-gray-500 text-xs my-3 pb-2 border-b border-gray-200">
                  PRODUCT INFORMATION
                </div> */}

                {/* <ul className="py-1">
                  <label className="flex text-center items-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 mx-4 px-4 py-2 text-sm cursor-pointer">
                    <input
                      data-testid="menu-item-Hb9kX4FRpQ3Kq9nwplEF"
                      type="checkbox"
                      id="Hb9kX4FRpQ3Kq9nwplEF"
                      className="form-checkbox focus:ring-blue-500 h-4 w-4 mr-2 text-blue-800 border-gray-300"
                      defaultValue="Hb9kX4FRpQ3Kq9nwplEF"
                    />
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.946411 2.46094H15.0536"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.946411 8.17969H15.0536"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.931274 14.1953H6.93127"
                          fill="none"
                          stroke="#0D121C"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="truncate text-ellipsis max-w-[12rem] @md:max-w-[40rem]">
                      asdf
                    </div>
                    <div className="ml-2">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.42,12.96c2.57,3.01,8.6,3.01,11.17,0,2.36-2.77,2.18-8.21-.66-10.58C10.38,.26,5.62,.26,3.08,2.38,.23,4.76,.05,10.19,2.42,12.96Z"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.57,7.17h1.71v3.96"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.58,11.13h3.4"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.29,4.25v.37"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </ul> */}


              </div>
            </div>
          </div>
          <div className="py-3 px-4 flex justify-end border-t border-gray-200">
            <button
              type="button"
              className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0 justify-end"
              onClick={() => {
                set_show_summarize_tone(true);
                handlePopoverClose();
              }}
            >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none">
                Apply to chat
              </span>
            </button>
          </div>
        </div>
      </Popover>

      <Toaster />

      {/* =====================Browse prompts ============ */}
    </>
  );
};

export default Chat;
