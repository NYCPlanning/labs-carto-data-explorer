import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LaunchIcon from '@material-ui/icons/Launch';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Link from '@material-ui/core/Link';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: '15px auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    backgroundColor: "#272822",
    color: "#FFFFFF",
  }
}));

export default function CartoListItem(props) {
  const classes = useStyles();
  const [cartoTables, setCartoTables] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const preventDefault = (event) => event.preventDefault();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Link href={'https://nycplanning-web.carto.com/u/planninglabs/tables/' + props.item.cdb_usertables + '/public'} onClick={preventDefault}>
            {props.item.cdb_usertables}&nbsp;
            <LaunchIcon />
          </Link>
        </Typography>
        <Link href={'https://planninglabs.carto.com:443/api/v2/sql?q=select * from ' + props.item.cdb_usertables + '&format=csv'}>
          CSV&nbsp;
          <CloudDownloadIcon />
        </Link>
        <br />
        <Link href={'https://planninglabs.carto.com:443/api/v2/sql?q=select * from ' + props.item.cdb_usertables + '&format=shapefile'}>
          Shapefile&nbsp;
          <CloudDownloadIcon />
        </Link>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show API call"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        <CardContent>
          bash:&nbsp;
          <code>
            wget {'https://planninglabs.carto.com:443/api/v2/sql?q=select * from ' + props.item.cdb_usertables}
          </code>
          <br /><br />
          http:&nbsp;
          <code>
            {'https://planninglabs.carto.com:443/api/v2/sql?q=select * from ' + props.item.cdb_usertables}
          </code>
        </CardContent>
      </Collapse>
    </Card>
  )
}