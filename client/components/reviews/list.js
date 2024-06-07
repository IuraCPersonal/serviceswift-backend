import { useState } from "react";
import ReviewItem from "./item";

import {
  Button,
  Rating,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ReviewsList = ({ reviewDialogOpen, setReviewDialogOpen }) => {
  const handleReviewDialogClose = () => setReviewDialogOpen(false);

  const handleAddReview = () => {
    setDummyReviews([...dummyReviews, newReview]);
    setNewReview({
      name: "",
      rating: 0,
      comment: "",
    });
    handleReviewDialogClose();
  };

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    content: "",
  });

  const [dummyReviews, setDummyReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2014-08-16 19:00",
      rating: 5,
      title: "Great product",
      content: "I love this",
    },
  ]);

  return (
    <div>
      <Dialog open={reviewDialogOpen} onClose={handleReviewDialogClose}>
        <DialogTitle>Add a Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
          />
          <Rating
            value={newReview.rating}
            onChange={(e, newValue) =>
              setNewReview({ ...newReview, rating: newValue || 0 })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={newReview.content}
            onChange={(e) =>
              setNewReview({ ...newReview, content: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button onClick={handleAddReview} variant="contained" color="primary">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>

      {dummyReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
