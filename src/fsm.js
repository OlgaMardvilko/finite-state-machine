class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		this.initial = config.initial;
		this.state = config.initial;
		this.states = config.states;
		this.transitions = this.states[config.initial].transitions;
		this.history = new Array(this.initial);
		this.count = 0;
	}	
	/**  
	* Returns active state.
	* @returns {String}
	*/
    getState() {
		return this.state;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		this.state = state;   //передаем текущее состояние
		this.transitions = this.states[state].transitions;   // запоминаем переход из данного состояния
		this.history.push(this.state);
		this.count = this.history.length-1;
		
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		this.state = this.transitions[event];
		this.transitions = this.states[this.state].transitions;
        this.count ++;
        this.history = this.history.slice(0, this.count);
        this.history.push(this.state);
	
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.state = this.initial;
		this.transitions = this.states[this.initial].transitions;
	
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var stArray = Object.keys(this.states);
		var result = [];
		if (!event) {
			result = stArray;
		} 
		else {
			for (var i = 0; i < stArray.length; i++) {
				if (!!this.states[stArray[i]].transitions[event]) {
					result.push(stArray[i]);
				}
			}
		  }
		  return result;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		if (this.count === 0) {
			return false;
		} 
		else {
			this.count --;
			this.state = this.history[this.count];
			this.transitions = this.states[this.state].transitions;
			return true;
		}
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if ((this.history.length == 1) || (this.count == this.history.length - 1)) {
			return false;
		} 
		else {
			this.count ++;
			this.state = this.history[this.count];
			this.transitions = this.states[this.state].transitions;
			return true;
		}
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.count = 0;
		this.history = new Array(this.initial);
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
