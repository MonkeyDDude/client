import React from 'react';

import PhraseNewForm from '../static/phraseNewForm';
import AlertPopin from '../static/alertPopin';

import Client from '../client';

export default React.createClass({
    getInitialState() {
        return {
            displayForm: false,
            message: null
        }
    },
    displayForm() {
        this.setState({displayForm: true});
    },
    addPhrase(phrase) {
        Client.ajax({
            type: 'POST',
            url: `phrases`,
            data: phrase
        }).done(() => {
            this.setState({displayForm: false, message: 'Phrase added'});
        });
    },
    clearMessage() {
        this.setState({message: null});
    },
    render() {
        return (
            <div className="phraseNewContainer">
                {this.state.message ? (
                    <AlertPopin message={this.state.message} onClose={this.clearMessage} />
                ) : null}
                {this.state.displayForm ? (
                    <PhraseNewForm project={this.props.project} onSubmit={this.addPhrase} />
                ) : (
                    <button className="btn btn-primary" onClick={this.displayForm}>Add phrase</button>
                )}
            </div>
        );
    }
});
