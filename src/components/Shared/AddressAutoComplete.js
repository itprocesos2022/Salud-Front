import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

import Geocode from 'react-geocode'
import { TextField } from '../UI'

function loadScript(src, position, id) {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}))

const AddressAutocomplete = ({
  onChange,
  onSetLocation,
  label,
  errorText,
  helperText,
  required,
  search
}) => {
  Geocode.setApiKey(`${process.env.REACT_APP_API_GOOGLE}`)
  Geocode.setLanguage('en')
  Geocode.setRegion('es')
  Geocode.enableDebug()
  const classes = useStyles()
  const [value, setValue] = React.useState(search || null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_GOOGLE}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }
    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(
          {
            ...request,
            componentRestrictions: { country: 'cl' }
          },
          callback
        )
      }, 200),
    []
  )
  const getLocationFromPLaceId = async (placeAddress) => {
    await Geocode.fromAddress(placeAddress).then(
      (response) => {
        onSetLocation(response.results[0].geometry.location)
        return response[0]
      },
      (error) => {
        //  eslint-disable-next-line
        console.log(error)
      }
    )
  }

  const handleSetOption = (__, option) => {
    setOptions(option ? [option, ...options] : options)
    setValue(option)
    getLocationFromPLaceId(option?.description || '')
  }

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description.toUpperCase()
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => handleSetOption(event, newValue)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        onChange(newInputValue)
      }}
      noOptionsText="Busca una direcci??n"
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label={label}
          error={errorText}
          helperText={helperText}
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        )
      }}
    />
  )
}

AddressAutocomplete.defaultProps = {
  label: 'Direcci??n'
}

export default AddressAutocomplete
