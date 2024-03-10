import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectModal from "./CreateProjectModal";
import ContinueButton from "./ContinueButton";
import { Id } from "../types";
import { getTags, getUsers } from "../ImprovementWorkLib";

export var users: any[] = [];
export var usersClassArray: any[] = [];
var usersInfoArray: any[] = [];

export class userIDname {
  id: string;
  sur_name: string;
  first_name: string;
  constructor(id: string, first_name: string, sur_name: string) {
    this.id = id;
    this.first_name = first_name;
    this.sur_name = sur_name;
  }
}

export class userInfo {
  id: string;
  sur_name: string;
  centrum: string;
  constructor(id: string, sur_name: string, centrum: string) {
    this.id = id;
    this.sur_name = sur_name;
    this.centrum = centrum;
  }
}

async function fetchUsers() {
  const userSnapshot = await getUsers();
  userSnapshot.forEach((doc) => {
    const userData = doc.data() as User;
    if (!users.includes(userData.first_name + " " + userData.sur_name)) {
      users.push(userData.first_name + " " + userData.sur_name);
      usersClassArray.push(new userIDname(doc.data().id, userData.first_name , userData.sur_name));
      usersInfoArray.push(
        new userInfo(doc.data().id, userData.sur_name, doc.data().centrum)
      );
    }
  });
}

export class User {
  id: Id;
  admin: boolean;
  centrum: string;
  clinic: string;
  email: string;
  first_name: string;
  sur_name: string;
  phone_number: string;
  place: string;
  profession: string;
  projects: Array<string>;

  constructor(
    id: Id,
    admin: boolean,
    centrum: string,
    clinic: string,
    email: string,
    first_name: string,
    sur_name: string,
    phone_number: string,
    place: string,
    profession: string,
    projects: Array<string>
  ) {
    this.id = id;
    this.admin = admin;
    this.centrum = centrum;
    this.clinic = clinic;
    this.email = email;
    this.first_name = first_name;
    this.sur_name = sur_name;
    this.phone_number = phone_number;
    this.place = place;
    this.profession = profession;
    this.projects = projects;
  }
}

export class Tag {
  id: Id;
  description: string;
  constructor(id: Id, description: string) {
    this.id = id;
    this.description = description;
  }
}

const memberConverter = {
  toFirestore: (memberData: any) => ({
    id: memberData.id,
    admin: memberData.admin,
    centrum: memberData.centrum,
    clinic: memberData.clinic,
    email: memberData.email,
    first_name: memberData.first_name,
    sur_name: memberData.sur_name,
    phone_number: memberData.phone_number,
    place: memberData.place,
    profession: memberData.profession,
    projects: memberData.projects,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new User(
      snapshot.id,
      data.admin,
      data.centrum,
      data.clinic,
      data.email,
      data.first_name,
      data.sur_name,
      data.phone_number,
      data.place,
      data.profession,
      data.projects
    );
  },
};

const tagConverter = {
  toFirestore: (tagData: any) => ({
    description: tagData.description,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new Tag(snapshot.id, data.description);
  },
};

export var tags: any[] = [];

async function fetchTags() {
  const querySnapshot = await getTags();
  querySnapshot.forEach((doc) => {
    if (!tags.includes(doc.data().description)) {
      let tag = doc.data().description;
      tags.push(tag);
    }
  });
}

interface CreateNewProjectProps {
  onRefreshProjects: () => Promise<void>;
  // Define other props here if there are any
}

function CreateNewProject({ onRefreshProjects }: CreateNewProjectProps) {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  fetchUsers();
  fetchTags();

  return (
    <div>
      <CreateProjectButton onClick={modalShow} />
      {/* <ContinueButton onClick={modalShow} /> */}
      <CreateProjectModal
        show={show}
        onHide={modalClose}
        users={users}
        tags={tags}
        usersClassArray={usersClassArray}
        usersInfoArray={usersInfoArray}
        onRefreshProjects={onRefreshProjects}
      />
    </div>
  );
}

export default CreateNewProject;
