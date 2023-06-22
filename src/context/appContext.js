import React, { createContext, useEffect, useState } from "react";
import AppNetwork from "../network";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {

  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const getAllCities = async () => {
    const res = await AppNetwork.fetchCity();
    // console.log(res);
    setStateList(res.states);
  };
  console.log('token', token)
  const getUserPermission = async (auth, userId) => {
    const res = await AppNetwork.fetchUsersPermission(userId, auth);
    setUserPermission(res.permission);
  };

  useEffect(() => {
    getAllCities();
  }, []);


  const [auth, setAuth] = useState(token);
  const [userTypes, setUserTypes] = useState('');
  const [userId, setUserId] = useState(id);
  const [userPermission, setUserPermission] = useState({});
  const [contextAllCourses, setContextAllCourses] = useState([]);
  const [contextCourseDetailsList, setContextCourseDetailsList] = useState([]);
  const [isExportEnable, setIsExportEnable] = useState(false);

  // Video Import Export
  const [exportAllowed, setExportAllowed] = useState(false);
  const [isImportVideoClicked, setIsImportVideoClicked] = useState(false);

  // Can be optimized to single object
  const [fromFolderId, setFromFolderId] = useState("");
  const [fromCourseId, setFromCourseId] = useState("");
  const [toParentId, setToParentId] = useState("");
  const [toCourseId, setToCourseId] = useState("");
  const [stateList, setStateList] = useState([]);


  const stateId = stateList.map((item) => item.id);
  // console.log(stateId, "id99999999999999");

  const [quizId, setQuizId] = useState("");

  useEffect(() => {
    getUserPermission(auth, userId);
  }, [auth, userId]);
  useEffect(() => {
    setUserTypes(userType)
  }, [userType])


  return (
    <AppContext.Provider
      value={{
        auth,
        userId,
        setAuth,
        contextAllCourses,
        setContextAllCourses,
        contextCourseDetailsList,
        setContextCourseDetailsList,
        setIsExportEnable,
        isExportEnable,
        fromFolderId,
        setFromFolderId,
        fromCourseId,
        setFromCourseId,
        toParentId,
        setToParentId,
        toCourseId,
        setToCourseId,
        stateList,
        isImportVideoClicked,
        setIsImportVideoClicked,
        exportAllowed,
        setExportAllowed,
        quizId,
        setQuizId,
        setUserId,
        stateId,
        userPermission,
        setUserPermission,
        setUserTypes,
        userTypes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
