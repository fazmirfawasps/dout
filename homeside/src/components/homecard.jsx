/* eslint-disable no-unused-vars */
import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(0),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));


export default function Homecard() {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <Box sx={{ flexGrow: 1, paddingLeft: '5vw', paddingRight: '5vw' }}>
      <Grid container spacing={10}>
        <Grid xs={12} md={3}>
          <Card sx={{ maxWidth: 345 ,}}>
            {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   // <IconButton aria-label="settings">
        //   //   <MoreVertIcon />
        //   // </IconButton>
        // }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image="/truck.jpg"
                alt="Truck"
                sx={{borderRadius:'20px'}}
              />
              <IconButton style={{ position: 'absolute', top: '10px', right: '10px',  color: isFavorite ? '#f44336' : '#484848' }} onClick={handleFavoriteClick}>
                <FavoriteIcon />
              </IconButton>
              {/* <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                <h2>Some Text</h2>
                <p>Some description</p>

              </div> */}
            </div>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect 
              </Typography>
            </CardContent>
            {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon /> */}
              {/* </IconButton> */}
            {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
            {/* </CardActions> */}
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
          </Card>

        </Grid>
        <Grid xs={12} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   // <IconButton aria-label="settings">
        //   //   <MoreVertIcon />
        //   // </IconButton>
        // }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image="/download.jpeg"
                alt="Truck"
              />
              <IconButton style={{ position: 'absolute', top: '10px', right: '10px',  color: isFavorite ? '#f44336' : '#484848' }} onClick={handleFavoriteClick}>
                <FavoriteIcon />
              </IconButton>
              <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                <h2>Some Text</h2>
                <p>Some description</p>

              </div>
            </div>
            {/* <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              </CardActions> */}
          </Card>

        </Grid>
        <Grid xs={12} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   // <IconButton aria-label="settings">
        //   //   <MoreVertIcon />
        //   // </IconButton>
        // }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image="/jcb.jpg"
                alt="jcb.jpg"
              />
              <IconButton style={{ position: 'absolute', top: '10px', right: '10px', color: isFavorite ? '#f44336' : '#484848' }} onClick={handleFavoriteClick}>
                <FavoriteIcon />
              </IconButton>
              <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                <h2>Some Text</h2>
                <p>Some description</p>

              </div>
            </div>
            {/* <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent> */}
            {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}