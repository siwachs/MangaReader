import Axios from "../axiosConfig";
import { decrypt } from "../encryption";

import { UserProfileProps, UserProfileError } from "@/CONSTANT_DATA";

const getUserProfile = async (context) => {
  const { req, query } = context;
  const uid = decrypt(query.uid);

  if (!uid)
    return {
      props: {
        ...UserProfileProps,
        ...UserProfileError,
      },
    };

  try {
    const response = await Axios.get(`/api/profile/${uid}`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });

    return {
      props: {
        ...UserProfileProps,
        user: response.data,
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...UserProfileProps,
        error: true,
        statusCode,
        message,
      },
    };
  }
};

export default getUserProfile;
