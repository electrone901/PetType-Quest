import React from "react";

function HeaderFilter() {
  return (
    <div className="bg-custom-primary h-[80px] p-5 flex flex-wrap justify-around gap-4">
      <h3 className="text-white font-bold text-2xl  ">Discover Project Experts</h3>
      <div className="flex gap-4">
        <select name="subject" id="subject" className="h-[35px] p-[8px] rounded">
          <option value="Social Media Content Creation">Social Media Content Creation</option>
          <option value="Blogging">Blogging</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Technology">Technology</option>
          <option value="Medical">Medical</option>
          <option value="Education">Education</option>
          <option value="Sports">Sports</option>
          <option value="Science">Science</option>
        </select>

        <select name="contentBy" id="contentBy" className="h-[35px] p-[8px] rounded">
          <option value="Professionals">Professionals</option>
          <option value="Students">Students</option>
          <option value="Anyone">Anyone</option>
        </select>
        <label htmlFor="language" className="text-white ml-5 font-bold mt-1">
          Language
        </label>
        <select name="language" id="language" className="h-[35px] p-[8px] rounded ml-[-7px]">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Chinese">Chinese</option>
          <option value="Russian">Russian</option>
        </select>
      </div>
    </div>
  );
}

export default HeaderFilter;
