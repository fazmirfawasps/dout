import React from 'react'
import AirbnbSlider, { AirbnbThumbComponent } from './Style'
import { Typography, Card, Stack, TextField, Box } from '@mui/material'
// import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types';
function FilterBar({
    propertType,
    setCategoryFilter,
    handlePrice,
    MIN = 1000,
    MAX = 10000,
    MAXIMUM,
    MINIMUM,
}) {
    // const matches = useMediaQuery('(max-width:600px)')
    return (
        <Box >
            <Card
                sx={{
                    padding: 4,
                   
                    width: 250,
                    height: 'auto',
                    mr:5,
                    boxShadow: 4,
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                        Filter By Property Type
                    </Typography>
                    <Typography
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setCategoryFilter('All')
                        }}
                    >
                        All
                    </Typography>
                    {propertType.map((Elemt, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setCategoryFilter(Elemt)
                            }}
                        >
                            {Elemt}
                        </Typography>
                    ))}
                    <Box m={2} />
                    <Typography variant="body1" fontWeight={600}>
                        Filter by price
                    </Typography>
                    <Stack direction={'row'}>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            disabled
                            value={MIN}
                            sx={{ width: 100 }}
                        />
                        <Typography p={1}>to</Typography>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            disabled
                            value={MAX}
                            sx={{ width: 100 }}
                        />
                    </Stack>
                    <AirbnbSlider
                        slots={{ thumb: AirbnbThumbComponent }}
                        onChange={handlePrice}
                        value={[MIN, MAX]}
                        min={MINIMUM}
                        max={MAXIMUM}
                    />
                </Stack>
            </Card>
        </Box>
    )
}
FilterBar.propTypes = {
    propertType: PropTypes.arrayOf(PropTypes.string),
    setCategoryFilter: PropTypes.func,
    handlePrice: PropTypes.func,
    MIN: PropTypes.number,
    MAX: PropTypes.number,
    MAXIMUM: PropTypes.number,
    MINIMUM: PropTypes.number,
};

export default FilterBar
