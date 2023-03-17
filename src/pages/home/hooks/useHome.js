import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../../../store/playlistsInfo";

const useHome = () => {
  // get playlist info
  const playlist = useSelector((state) => state.playlistsInfo);
  const { info, recent, favorite, error } = playlist;

  /**
   *
   * @param {Array} rootArr find playlist information form this array
   * @param {Array} curr array of playlist ids
   * @returns new filtered array of playlist information
   */
  const createList = (rootArr, curr) => {
    return curr.reduce((acc, curr) => {
      const item = rootArr.find((item) => item.playlistId === curr);
      acc.push(item);
      return acc;
    }, []);
  };

  const recentItems = createList(info, recent);
  const favouriteItems = createList(info, favorite);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(removeError());
    }
  }, [error]);

  return { recentItems, favouriteItems,info };
};

export default useHome