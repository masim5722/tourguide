import React, { Component, Fragment } from 'react'
import {callApi} from "./api";
import Tour from "reactour";
import './styles.module.css';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'


const disableBody = target => disableBodyScroll(target);
const enableBody = target => enableBodyScroll(target);

class TourGuide extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            steps: undefined,
            isTourOpen: true,
            errors:{
                message: undefined
            }
        }
    }

    /**
     * This code will be executed on component load
     */
    componentDidMount() {
        this.handleStartTour('tour-guide');
    }

    /**
     * Function tp update state
     * @param state_name
     * @param state_to_update
     * @param value
     */
    updateState = (state_name, state_to_update, value) => {
        // updating root state value
        if (state_name === "root") {
            if(state_to_update === "error" || state_to_update ==="success"){
                setTimeout(()=>{
                    this.setState({[state_to_update]: false});
                },3000);
            }
            this.setState({[state_to_update]: value});
        }

        // updating form data errors state
        if (state_name === "errors") {
            const {errors} = {...this.state.form_data};
            errors[state_to_update] = value;
            this.setState({errors});
        }
    };

    /**
     * Function to add or updated object ot existing state
     * @param data
     */
    updateStepsState = (data) => {
        const id = data.id;
        // checking if the data is new or the previous one is modified
        const check = this.state.steps.filter(item => item.id === id);
        if (check.length === 0) {
            // adding new object in the start of the state
            this.setState({
                activities_and_locations: [data, ...this.state.activities_and_locations]
            });
        }
    };

    /**
     * handle close tour
     */
    handleCloseTour = () => {
        this.setState({
            isTourOpen: false
        });
    };

    /**
     * Function to handle start tour
     */
    handleStartTour = (api_url) => {
        // calling api to get initial data
        const payload = {
            url: this.props.base_api_url+api_url,
            method: 'POST',
            secret: this.props.api_secret,
            data:{
                system_id: this.props.system,
                page: this.props.page,
                employee_id: this.props.employeeId,
            }
        };
        // calling get user initial data
        callApi(payload).then(response => {
            // processing response
            let steps = [];
            if(response.data.data){
                Object.keys(response.data.data).map((k, idx) => {
                    const selector = response.data.data[k].selector;
                    const content = response.data.data[k].step;
                    const title = response.data.data[k].title;
                    const step_id = response.data.data[k].id;

                    // creation action object
                    const action = () => {
                        // calling api to get initial data
                        const payload = {
                            url: base_api_url+'employee-steps',
                            method: 'POST',
                            secret: api_secret,
                            data:{
                                step_id: step_id,
                                employee_id: this.props.employeeId,
                            }
                        };
                        callApi(payload).then(response => {
                            if(response.data.error){
                                console.log(response.data.error);
                            }
                            else{
                                console.log(response.data.data);
                            }
                        })
                    };

                    /**
                     * Ending tour
                     */
                    const endTour = () => {
                        // calling api to get initial data
                        const payload = {
                            url: base_api_url+'tour-guide/end',
                            method: 'POST',
                            secret: api_secret,
                            data:{
                                system_id: this.props.system,
                                page: this.props.page,
                                employee_id: this.props.employeeId,
                            }
                        };
                        callApi(payload).then(response => {
                            if(response.data.error){
                                console.log(response.data.error);
                            }
                            this.updateState("root", "steps", undefined);
                        })
                    };

                    /**
                     * Enabling end tour button on the basis of prop value
                     * @returns {*}
                     */
                    const endTourButton = () => {
                            return(
                                <Fragment>
                                    {
                                        this.props.endbutton ? (
                                            <button className="button float-right" onClick={endTour}>End Tour</button>
                                        ) : null
                                    }
                                </Fragment>
                            )
                    };

                    steps.push({
                        selector: selector,
                        content: function DemoHelperComponent({ goTo }) {
                            // moving the tour directly to the un viewed step
                            if(response.data.data[k].goto){
                                setTimeout(function() {
                                    goTo(response.data.data[k].goto);
                                    response.data.data[0].goto = undefined;
                                },20);
                            }

                            /**
                             * Function to move the tour to first step
                             */
                            const handleGotoFirstStep = () =>{
                                response.data.data[0].goto = undefined;
                                goTo(0)
                            };

                            /**
                             * Function to end tour
                             */
                            const handleEndTour = () => {
                                return endTourButton();
                            };

                            const handleImage = () =>{
                                if(response.data.data[k].image){
                                    return(
                                        <div className="tour-image">
                                            <img src={base_api_url+response.data.data[k].image}/>
                                        </div>
                                    )
                                }
                            };

                            return (
                                <Fragment>
                                    <div className="tour-content">
                                        {handleImage()}
                                        <div className="tour-text">
                                            <b className="title">{title}</b><br />
                                            <div dangerouslySetInnerHTML={{__html: content}} />
                                        </div>
                                        <div className="mt15 tour-buttons">
                                            <button className="goto-button" onClick={handleGotoFirstStep}>Goto Step 1</button>
                                            {handleEndTour()}
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        },
                        action: action,
                        style: {
                            borderRadius: '3px'
                        }
                    });
                });
            }
            this.updateState("root", "steps", steps.length > 0 ? steps : undefined);
        })
            //  handling error
            .catch((error) => {
                // if(error.response.status === 404){
                //     // this.updateState("errors", "message", "error.response.data");
                // }
            });
    };

    handleStartAgain = () => {
        this.handleStartTour('tour-guide/start');
    };

    render() {
        return (
           <Fragment>
               {
                   this.state.steps ? (
                   <Tour
                       onAfterOpen={disableBody}
                       onBeforeClose={enableBody}
                       steps={this.state.steps}
                       isOpen={this.state.isTourOpen}
                       onRequestClose={this.handleCloseTour}
                       closeWithMask={false}
                       showCloseButton={false}
                       scrollOffset={1}
                       showNavigation={true}
                       className="tour-box"
                   />
                    ) : null
               }

               {
                   this.props.startbutton ? (
                       <button className="floating-button" onClick={this.handleStartAgain} data-tour='start-tour-again'>Start Tour</button>
                   ) : null
               }
           </Fragment>
        );
    }
}

export default TourGuide;
