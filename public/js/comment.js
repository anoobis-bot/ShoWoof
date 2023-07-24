$(document).ready(function() {
    var commentCounter = 1;
  
    $('#postComment').click(function() {
      var commentText = $('#inputComment').val();
  
      if (commentText !== '') {
        var commentId = 'comment-' + commentCounter;
  
        var commentContainer = $('<div>').addClass('commentBase').attr('id', commentId);
  
        var commenterImg = $('<div>').addClass('commenterImg');
        commentContainer.append(commenterImg);
  
        var commentDetails = $('<div>').addClass('commentDetails');
        commentContainer.append(commentDetails);
  
        var commenterDetails = $('<div>').addClass('commenterDetails');
        commentDetails.append(commenterDetails);
  
        var commenterUser = $('<div>').addClass('commenterUser').text('DogsDBest');
        commenterDetails.append(commenterUser);
  
        var commentDate = $('<div>').addClass('commentDate').text('now');
        commenterDetails.append(commentDate);
  
        var commentTextElement = $('<div>').addClass('commentText').text(commentText);
        commentDetails.append(commentTextElement);
  
        var commentCommandBar = $('<div>').addClass('commentCommandBar');
        commentDetails.append(commentCommandBar);
  
        var commentVote = $('<div>').addClass('commentVote');
        commentCommandBar.append(commentVote);
  
        var upvote = $('<div>').addClass('upvote');
        commentVote.append(upvote);
        commentVote.append('&nbsp;');
        var commentToolText = $('<div>').addClass('commentToolText').text('0');
        commentVote.append(commentToolText);
        commentVote.append('&nbsp;');
        var downvote = $('<div>').addClass('downvote');
        commentVote.append(downvote);
  
        var commentReply = $('<div>').addClass('commentReply');
        commentCommandBar.append(commentReply);
        var replyImg = $('<img>').attr('src', '/images/post_elements/comment.png');
        commentReply.append(replyImg);
        var replyText = $('<div>').addClass('commentToolText').text('Reply');
        commentReply.append(replyText);

        var commentEdit = $('<div>').addClass('commentEdit');
        commentCommandBar.append(commentEdit);
        var editImg = $('<img>').attr('src', '/images/post_elements/output-onlinepngtools.png');
        commentEdit.append(editImg);
        var editText = $('<div>').addClass('commentToolText').text('Edit');
        commentEdit.append(editText);

        
  
        $('#commentSection').append(commentContainer);
        commentCounter++;
  
        $('#inputComment').val('');
      }
    });
  });