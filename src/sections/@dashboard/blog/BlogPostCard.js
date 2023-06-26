import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom/dist';
import PropTypes from 'prop-types';
// @mui

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, MenuItem, Menu, IconButton, Dialog, CardActionArea } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import EditInstituteForm from '../../../Modals/EditInstituteModal';
import AdminNetwork from '../../../pages/adminNetwork';
import AppContext from "../../../context/appContext";

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const options = ["Edit", "Active/Inactive", 'Admin', "Billing"];

const ITEM_HEIGHT = 48;

export default function BlogPostCard({ post, index }) {
  const { auth, userPermission } = useContext(AppContext);

  const [instituteData, setInstituteData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openEditInstitute, setOpenEditInstitute] = useState(false);
  const { cover, title, view, comment, share, author, createdAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };


  const handleOpenEditModal = () => {
    setOpenEditInstitute(true);
  }

  const handleCloseEditModal = () => {
    setOpenEditInstitute(false);
  }

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    // console.log(event)
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    // console.log(e.target.outerText)

    if (e.target.outerText === "Edit") {
      setOpenEditInstitute(true);
    }

    if (e.target.outerText === "Active/Inactive") {
      // setAddDialogOpen(true);
    }

    if (e.target.outerText === "Admin") {
      // setAddDialogOpen(true);
      navigate('/dashboard/user');
    }

    if (e.target.outerText === "Billing") {
      // setAddDialogOpen(true);
      navigate('/dashboard/billing');
    }

  };

  const getInstituteItem = async () => {
    try {
      // setIsLoading(true);
      const response = await AdminNetwork.getInstituteList(
        auth,
        page,
        pageSize
      );
      setInstituteData(response);
      // setIsLoading(false);
      // setRowCountState(response.count);
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
    }
  };

  // console.log('instituteData', instituteData)

  useEffect(() => {
    getInstituteItem();
  }, [page, pageSize])

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Dialog open={openEditInstitute} onClose={handleCloseEditModal} >
        <EditInstituteForm
          handleClose={handleCloseEditModal}
        // auth={auth}
        // onSuccess={() => {
        //   handleAddStudentDialogClose();
        //   getStudents();
        // }}
        />
      </Dialog>
      <Card sx={{ position: 'relative' }} >
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <CardActionArea 
          component={RouterLink} to={`/institute/insights/${index}`}
        >
          <StyledCardMedia
            sx={{
              // ...((latestPost) && {
              //   pt: 'calc(100% * 4 / 3)',
              //   '&:after': {
              //     top: 0,
              //     content: "''",
              //     width: '100%',
              //     height: '100%',
              //     position: 'absolute',
              //     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              //   },
              // }),
              // ...(latestPostLarge && {
              //   pt: {
              //     xs: 'calc(100% * 4 / 3)',
              //     sm: 'calc(100% * 3 / 4.66)',
              //   },
              // }),
            }}
          >
            <SvgColor
              color="paper"
              src="/assets/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
                // ...((latestPostLarge || latestPost) && { display: 'none' }),
              }}
            />
            <StyledAvatar
              alt={author.name}
              src={author.avatarUrl}
              sx={{
                // ...((latestPostLarge || latestPost) && {
                //   zIndex: 9,
                //   top: 24,
                //   left: 24,
                //   width: 40,
                //   height: 40,
                // }),
              }}
            />
            <StyledCover alt={title} src={cover} />
          </StyledCardMedia>

          <CardContent
            sx={{
              pt: 4,
              // ...((latestPostLarge || latestPost) && {
              //   bottom: 0,
              //   width: '100%',
              //   position: 'absolute',
              // }),
            }}
          >
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              {fDate(createdAt)}
            </Typography>

            <StyledInfo>
              {POST_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    // ...((latestPostLarge || latestPost) && {
                    //   color: 'grey.500',
                    // }),
                  }}
                >
                  <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                </Box>
              ))}
            </StyledInfo>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>

  );
}