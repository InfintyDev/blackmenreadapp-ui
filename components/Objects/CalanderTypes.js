
export class CalendarDayProps {
    constructor(events = [], date = new Date()) {

        var namesList = []
        var startList = []
        var endList = []
        var i = 0;
        for (let index = 0; index < events.length; index++) {
            const element = events[index];
            namesList[i] = element[0]
            startList[i] = element[1]
            endList[i] = element[2]
            //console.log(element)
            i += 1;

        }

        //console.log(namesList)
        this.fullDate = date
        this.events = namesList
        this.dateStart = startList
        this.dateEnd = endList


    }


    // put your StyleSheet type here if you want
};
export class EventProps {
    constructor() {
        this.state = {
            time: new Date(),
            eventName: '',
            description: '',
        }

    }


    // put your StyleSheet type here if you want
};

