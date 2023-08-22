import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../../../apis/apiService';
import { BACKEND_URL, BACK_END_API_SINGLE_WORKFLOW } from '../../../apis/urls';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const WorkflowSteps = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [workFlowData, setWorkFlowData] = useState(null);
  const [inputValues, setInputValues] = useState({});


  const [isLoading, setIsLoading] = useState({});
  const [randomOutputs, setRandomOutputs] = useState({});
  
  const [currentStep, setCurrentStep] = useState(0);


  const [submittedSteps, setSubmittedSteps] = useState([]);
  const [isFirstStepSubmitted, setIsFirstStepSubmitted] = useState(false);


  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );
  let ChosenWorkspaceId = useSelector(
    (state) => state.SetChosenWorkspaceId.ChosenWorkspaceId
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page');
  const workflow_id = searchParams.get('workflow_id');

  const get_workflow_data = async () => {
    const resp = await fetchData(
      BACKEND_URL + BACK_END_API_SINGLE_WORKFLOW + workflow_id,
      TOKEN
    );
    if (resp.status === 200) {
        // console.log("resp.data : ",resp.data)
      setWorkFlowData(resp.data);
    }
  };

  useEffect(()=>{
    // console.log(workFlowData)
},[workFlowData])

  useEffect(() => {
    if (workflow_id != null) {
      get_workflow_data();
    }
  }, []);



  const handleInputChange = (stepIndex, fieldName, value) => {
    if (value.length <= workFlowData[0].WorkFlowTemplateId[stepIndex].inner_fields.find(field => field.label_title === fieldName).range_of_text) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [stepIndex]: {
          ...prevInputValues[stepIndex],
          [fieldName]: value,
        },
      }));
    }
  };

  const handleSubmit = async (event, stepIndex) => {
    event.preventDefault();

    if (inputValues[stepIndex]) {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [stepIndex]: true }));


    // Create an object with input name and value
    const inputData = {};
    for (const fieldName in inputValues[stepIndex]) {
        inputData[fieldName] = inputValues[stepIndex][fieldName];
    }
    console.log('Input Data:', inputData);

      // Simulate async operation (e.g., API call) with setTimeout
      
        fetch('http://localhost:8000/v1/workflow/output') // Replace with your API URL
          .then(response => response.json())
          .then(data => {
            setRandomOutputs((prevRandomOutputs) => ({ ...prevRandomOutputs, [stepIndex]: data.random_string }));
            setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [stepIndex]: false }));
            handleStepSubmit(stepIndex);
          })
          .catch(error => {
            console.error('Error fetching random output:', error);
            setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [stepIndex]: false }));
          });
      
    }
  };



  const handleStepSubmit = (stepNo) => {
    setSubmittedSteps((prevSubmittedSteps) => [...prevSubmittedSteps, stepNo]);
  };


  const handleRandomOutputChange = (stepIndex, value) => {
    setRandomOutputs((prevRandomOutputs) => ({
      ...prevRandomOutputs,
      [stepIndex]: value,
    }));
  };


  const handleNextStep = () => {
    if (currentStep < workFlowData[0].WorkFlowTemplateId.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsFirstStepSubmitted(false);
  
      // Clear input values for the next step
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [currentStep + 1]: {},
      }));
  
      // Log the random output for the current step if available
      if (randomOutputs[currentStep]) {
        console.log('Random Output for Step', currentStep, ':', randomOutputs[currentStep]);
      } else {
        console.log('Random Output not available for Step', currentStep);
      }
    } else {
      // If it's the last step, log the random output
      if (randomOutputs[currentStep]) {
        console.log('Random Output for Step', currentStep, ':', randomOutputs[currentStep]);
      } else {
        console.log('Random Output not available for Step', currentStep);
      }
    }
  };


  return (
    <div className="container mx-auto py-8">
    {workFlowData && workFlowData[0].WorkFlowTemplateId.map((step, stepIndex) => (
      <div key={step.id} className="mb-8">
      <h2 className="text-xl font-bold">{`Step ${stepIndex + 1}`}</h2>
        <h2 className="text-xl font-bold">{step.title}</h2>
        {step.inner_fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block font-bold mb-1">{field.label_title}</label>
            {field.component === 'textarea' ? (
              <div className="relative">
                <textarea
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                  value={inputValues[stepIndex]?.[field.label_title] || ''}
                  onChange={(e) => handleInputChange(stepIndex, field.label_title, e.target.value)}
                  disabled={!isFirstStepSubmitted && stepIndex !== currentStep}
                />
                <div className="absolute bottom-0 right-0 text-xs text-gray-500">
                  {inputValues[stepIndex]?.[field.label_title]?.length || 0}/{field.range_of_text}
                </div>
              </div>
            ) : (
              <select
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValues[stepIndex]?.[field.label_title] || ''}
                onChange={(e) => handleInputChange(stepIndex, field.label_title, e.target.value)}
                disabled={!isFirstStepSubmitted && stepIndex !== currentStep}
              >
                {/* Options */}
              </select>
            )}
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isLoading[stepIndex] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => {
              handleSubmit(e, stepIndex);
              setIsFirstStepSubmitted(true);
            }}
            disabled={
              isLoading[stepIndex] || (!isFirstStepSubmitted && stepIndex !== currentStep)
            }
          >
            {isLoading[stepIndex] ? 'Loading...' : 'Submit'}
          </button>
          {stepIndex === currentStep && (
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
              onClick={handleNextStep}
              disabled={
                isLoading[stepIndex] || (!isFirstStepSubmitted || stepIndex !== currentStep)
              }
            >
            {currentStep === workFlowData[0].WorkFlowTemplateId.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
        {randomOutputs[stepIndex] && (
          <div className="mt-2 bg-gray-100 p-2 rounded">
            <strong>Random Output:</strong>
            <textarea
              className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={randomOutputs[stepIndex]}
              onChange={(e) => handleRandomOutputChange(stepIndex, e.target.value)}
            />
           </div>
          )}
        </div>
      ))}
    </div>
  );
};




export default WorkflowSteps;

