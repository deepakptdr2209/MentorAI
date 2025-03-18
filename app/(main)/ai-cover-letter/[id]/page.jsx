import React from "react";

const coverLetterId = async ({ params }) => {
  const id = await params.id;
  return <div>coverLetterId : {id}</div>;
};

export default coverLetterId;
