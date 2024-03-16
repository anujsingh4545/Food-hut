import React, {useEffect, useRef, useState} from "react";
import CommentBox from "./CommentBox";
import {Toaster, toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const Comment = ({id}) => {
  const {currentUser, loading} = useSelector((state) => state.user);
  const params = useParams();
  const [submit_c, setSubmit_c] = useState(false);
  const [comments, setComments] = useState([]);
  const textC = useRef();

  useEffect(() => {
    const getComments = async () => {
      try {
        fetch(`http://localhost:8000/api/comment/${params.id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setComments(data);
            } else {
              toast.error("Something went wrong!");
            }
          });
      } catch (error) {
        toast.error(error);
      }
    };
    getComments();
  }, [submit_c]);

  console.log(comments);

  // ***********************************************************************************8888

  const postComment = async () => {
    let currentText = textC.current.value;

    if (!currentText) {
      toast.error("Please enter comment first !");
    } else {
      //

      const commentData = {
        currentText,
        food_id: params.id,
        user_id: currentUser.user._id,
        user_profile: currentUser.user.profileImage,
      };

      setSubmit_c(true);

      //
      try {
        fetch("http://localhost:8000/api/comment/uploadcomment", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(commentData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success(data.message);
              setSubmit_c(false);
              textC.current.value = "";
            } else {
              toast.error(data.message);
              setSubmit_c(false);
            }
          });
      } catch (error) {
        toast.error(error);
        setSubmit_c(false);
      }

      //
    }
  };

  //   **********************************************************************************8

  return (
    <div className="md:px-10 px-2 ">
      <Toaster />
      <p className=" text-2xl tracking-wider font-semibold ">
        Reviews (<span>{comments?.length}</span>)
      </p>

      {currentUser ? (
        <section className=" w-full  flex  flex-col md:flex-row items-center justify-center my-5 ">
          <input type="text" ref={textC} placeholder="Write your review" className=" text-md w-full py-2 font-normal tracking-wide outline-none  bg-transparent border-b-2 border-yellow-500 " />

          <div className=" flex flex-row  justify-end  mt-3 md:mt-0 w-[100%] md:w-fit md:items-center gap-3 md:ml-5 ">
            <button className="nav_btn bg-white text-yellow-500 rounded-xl text-lg " onClick={() => (textC.current.value = "")}>
              Clear
            </button>
            <button className="nav_btn bg-yellow-500 text-white rounded-xl text-lg " onClick={postComment}>
              {submit_c ? "Loading..." : "Submit"}
            </button>
          </div>
        </section>
      ) : (
        " "
      )}

      <section className=" my-10">
        {comments.map((comm) => {
          return <CommentBox userid={comm.userid} userProfile={comm.userProfile} comment={comm.comment} time={comm.time} />;
        })}
      </section>
    </div>
  );
};

export default Comment;
