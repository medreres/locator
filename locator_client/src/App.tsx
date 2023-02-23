import { Button, Card, CardActions, CardContent, CardMedia, Chip, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { Suspense, useRef, useState } from 'react'
import { getLocation } from './api/location';
import { Location } from './models/venue';

function App() {
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<Location | null>(null)

  const handleRequest = () => {
    const lat = latRef.current!.value;
    const long = longRef.current!.value;

    getLocation(lat, long).then(result => setLocation(result))
  };

  console.log(location)

  return (
    <Box width='100vw' display='flex' flexDirection='column' alignItems='center' pt={5}>

      <Stack direction='column' gap={2} maxWidth='300px'>
        <TextField inputRef={latRef} label='Latitute' type='number' />
        <TextField inputRef={longRef} label='Longtitude' type='number' />
        <Button onClick={handleRequest} variant='outlined'>Get Location</Button>
      </Stack>

      {location != null && (
        <>
          {location?.result ? (
            <>
              <Typography my={2} variant='body1'>It's seems that you are here</Typography>
              <Typography variant='h3' textAlign={'center'}>{location.result.name}</Typography>
            </>
          ) :
            <Typography my={2} variant='body1'>Couldn't find exact location</Typography>
          }

          {location?.placesNearby && (
            <>
              <Typography my={2} variant='body2'>Places nearby</Typography>
              <Stack direction='row' gap={2}>
                {location.placesNearby.map(place => <Chip key={place.fsq_id} label={place.name} variant="outlined" />)}
              </Stack>
            </>
          )}
        </>
      )}

    </Box >
  )
}

export default App
