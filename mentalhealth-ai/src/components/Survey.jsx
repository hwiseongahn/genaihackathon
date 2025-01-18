import React from 'react';

function Survey({ isSurveyReady }) {
    if (isSurveyReady) {
        return (
            <div className='container'>
            <form>
                <div className='flex-column'>
                <label>
                    How are you feeling today?
                    <input type='checkbox' />
                </label>
                <label>
                    What are you feeling?
                    <input type='checkbox' />
                </label>
                <label>
                    How long have you been feeling this way?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you felt this way before?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been diagnosed with any mental health disorders?
                    <input type='checkbox' />
                </label>
                <label>
                    Do you have any family history of mental health disorders?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you experienced any traumatic events recently?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling suicidal?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling homicidal?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling paranoid?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling anxious?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling depressed?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling manic?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling psychotic?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling dissociative?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling obsessive-compulsive?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling post-traumatic stress?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling eating disordered?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling substance addicted?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling personality disordered?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling attention deficit disordered?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling autistic?
                    <input type='checkbox' />
                </label>
                <label>
                    Have you been feeling learning disordered?
                    <input type='checkbox' />
                </label>
                </div>
            </form>
            </div>
        );
    } 
    else {
        return (
            <></>
        );
    }
}

export default Survey;