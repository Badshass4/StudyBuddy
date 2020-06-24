import React, { Component } from 'react'
import SubjectBoard from '../components/SubjectBoard'

class DashboardPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subjects: [
                { id: 101, name: "Data Structures" },
                { id: 102, name: "Alogorithms" },
                { id: 103, name: "Operating Systems" }],
        }
    }

    render() {
        return (
            <div>
                <SubjectBoard subjects={this.state.subjects}></SubjectBoard>
            </div>
        )
    }
}

export default DashboardPage
