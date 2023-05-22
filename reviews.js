/**
 * @param { <Given a set of reviews provided by customers for a product and an array containing
 good words, write a function to sort the reviews in descending order 
 according to their Goodness Value (Higher goodness value first).
 Goodness Value of a string is the number of good words in that string. 
 eg: Good words array - [“good”, “excellent”, “durable”]
 Reviews
 - [“Very good!”, --- 1
 “This works so good. It’s an excellent buy!”, --- 2
 “It’s the most durable device. Must buy!”] --- 1
 Sorted output: [reviews[1],reviews[0],reviews[2]]>} reviews 
 * @param {*} goodWords 
 * @returns 
 */


// Original thought of using two arrays
function sortReviews(reviews, goodWords) {
  let sortedReviews = [];
  let sortedValues = [];

  outer:
  for (let i = 0; i < reviews.length; i++) {
    // Get a review from reviews
    let review = reviews[i];

    // Calculate goodness value of review by counting number of good words in string
    let goodnessValue = 0;
    for (let word of review) {
      if (goodWords.includes(word)) {
        goodnessValue++;
      }
    }

    // Add first review and goodness value
    if (!sortReviews.length) {
      sortedReviews.push(review);
      sortedValues.push(count);
      continue outer;
    }

    // Add review and goodness value to their respective arrays in order
    sorting:
    for(let j = 0; j < sortedValues.length; j++) {
      if (goodnessValue <= sortedValues[j]) {
        sortedValues = sortedValues.slice(0, j).concat(goodnessValue).concat(sortedValues.slice(j));
        sortedReviews = sortedReviews.slice(0, j).concat(review).concat(sortedReviews.slice(j));        
        break sorting;
      }
      // Condition to add last review/goodness value
      if (j === sortedValues.length - 1) {
        sortedValues.push(goodnessValue);
        sortReviews.push(review);
      }
    }
  }

  return sortReviews.reverse();
}


// Sort reviews by using a map
function sortReviewsWithMap(reviews, goodWords) {
  let goodnessMap = {};

  for (let review of reviews) {
    // Calculate goodness value of review by counting number of good words in string
    let goodnessValue = 0;
    for (let word of review) {
      if (goodWords.includes(word)) {
        goodnessValue++;
      }
    }

    // Map goodness value to review, grouping reviews with equal goodness values
    if (goodnessMap[goodnessValue]) {
      goodnessMap[goodnessValue] = [...goodnessMap[goodnessValue], review];
    } else {
      goodnessMap[goodnessValue] = [review];
    }
  }
  
  // Loop over sorted goodness values and add reviews to the array
  let sortedReviews = [];
  for (let key of Object.keys(goodnessMap).sort()) {
    sortedReviews = sortedReviews.concat(goodnessMap[key]);
  }

  return sortedReviews.reverse();
}