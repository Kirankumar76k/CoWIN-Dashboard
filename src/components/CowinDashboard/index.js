// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    VaccineDataList: {},
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData => ({
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
          vaccineDate: eachData.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachElem => ({
          count: eachElem.count,
          gender: eachElem.gender,
        })),
      }
      this.setState({
        VaccineDataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-head">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {VaccineDataList} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverage={VaccineDataList.last7DaysVaccination}
        />

        <VaccinationByGender
          vaccinationByGender={VaccineDataList.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={VaccineDataList.vaccinationByAge} />
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="icon"
            />
            <p className="icon-title">Co-WIN</p>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
