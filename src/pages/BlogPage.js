import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography ,Dialog} from '@mui/material';
// components
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import AddInstituteForm from '../Modals/AddInstituteForm';
import Iconify from '../components/iconify';
import EditInstituteForm from '../Modals/EditinstituteForm';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [openAddInstitute, setOpenAddInstitute] = useState(false);

  const handleOpenAddModal = () => {
    setOpenAddInstitute(true);
  }

  const handleCloseAddModal = () => {
    setOpenAddInstitute(false);
  }

  return (
    <>
      {/* <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet> */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Institute
          </Typography>
          <Button onClick={handleOpenAddModal} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Institute
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>

      <Dialog open={openAddInstitute} onClose={handleCloseAddModal} >
        <AddInstituteForm
        handleClose={handleCloseAddModal}
        // auth={auth}
        // onSuccess={() => {
        //   handleAddStudentDialogClose();
        //   getStudents();
        // }}
        />
      </Dialog>
    </>
  );
}
