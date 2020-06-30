import React from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from 'react-google-maps'
import Autocomplete from 'react-google-autocomplete'
import Geocode from 'react-geocode'
import { GeoLocation } from './types'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
Geocode.enableDebug()

interface Props {
  zoom: number
  height: number
  lat: number
  lng: number
  onLocationChange: (location: GeoLocation) => void
}

// State is the same as the GeoLocation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State extends GeoLocation {}

class LocationMap extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      lat: this.props.lat,
      lng: this.props.lng,
    }
  }

  componentDidMount(): void {
    this.geoCodeFromLatLng(this.state.lat, this.state.lng)
  }

  shouldComponentUpdate(nextProps, nextState): boolean {
    return (
      this.state.lat !== this.props.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    )
  }

  componentDidUpdate(): void {
    this.props.onLocationChange(this.state)
  }

  geoCodeFromLatLng = (lat: number, lng: number): void => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const addressArray = response.results[0].address_components

        this.setState({
          address: response.results[0].formatted_address || '',
          area: this.getArea(addressArray) || '',
          city: this.getCity(addressArray) || '',
          state: this.getState(addressArray) || '',
        })
      },
      error => {
        console.error(error)
      },
    )
  }

  getCity = (addressArray: any[]): string => {
    const administrativeAreaL2 = addressArray.find(
      address => address.types[0] === 'administrative_area_level_2',
    )

    return administrativeAreaL2 ? administrativeAreaL2.long_name : null
  }

  getArea = (addressArray: any[]): string => {
    const locality = addressArray.find(address =>
      address.types.includes('sublocality_level_1', 'locality'),
    )

    return locality ? locality.long_name : null
  }

  getState = (addressArray: any[]): string => {
    const administrativeAreaL1 = addressArray.find(
      address => address.types[0] === 'administrative_area_level_1',
    )

    return administrativeAreaL1 ? administrativeAreaL1.long_name : null
  }

  onPlaceSelected = (place): void => {
    const addressArray = place.address_components
    const latValue = place.geometry.location.lat()
    const lngValue = place.geometry.location.lng()

    this.setState({
      address: place.formatted_address || '',
      area: this.getArea(addressArray) || '',
      city: this.getCity(addressArray) || '',
      state: this.getState(addressArray) || '',
      lat: latValue,
      lng: lngValue,
    })
  }

  onMarkerDragEnd = (event): void => {
    this.geoCodeFromLatLng(event.latLng.lat(), event.latLng.lng())
  }

  render(): JSX.Element {
    const AsyncMap = withScriptjs<any>(
      withGoogleMap(() => (
        <>
          <div style={{ position: 'absolute', top: 0, width: '100%' }}>
            <Autocomplete
              style={{ borderRadius: 0 }}
              onPlaceSelected={this.onPlaceSelected}
              types={['(regions)']}
            />
          </div>
          <GoogleMap
            defaultZoom={15}
            defaultCenter={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
            defaultOptions={{
              fullscreenControl: false,
            }}
          >
            <Marker
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.state.lat,
                lng: this.state.lng,
              }}
            />
            <Marker />
            <InfoWindow
              position={{
                lat: this.state.lat + 0.0018,
                lng: this.state.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {this.state.address || 'Drag marker or enter an address'}
                </span>
              </div>
            </InfoWindow>
          </GoogleMap>
        </>
      )),
    )

    return (
      <div style={{ position: 'relative' }}>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={
            <div style={{ height: `${this.props.height}px` }} />
          }
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    )
  }
}

export default LocationMap