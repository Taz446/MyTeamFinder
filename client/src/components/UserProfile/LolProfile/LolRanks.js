import React from "react";

const LolRanks = (props) => {
    return(
        <React.Fragment>
            <option value={props.value}>select rank</option>
            <option value="1">IRON IV</option>
            <option value="2">IRON III</option>
            <option value="3">IRON II</option>
            <option value="4">IRON I</option>
            <option value="5">BRONZE IV</option>
            <option value="6">BRONZE III</option>
            <option value="7">BRONZE II</option>
            <option value="8">BRONZE I</option>
            <option value="9">SILVER IV</option>
            <option value="10">SILVER III</option>
            <option value="11">SILVER II</option>
            <option value="12">SILVER I</option>
            <option value="13">GOLD IV</option>
            <option value="14">GOLD III</option>
            <option value="15">GOLD II</option>
            <option value="16">GOLD I</option>
            <option value="17">PLATINUM IV</option>
            <option value="18">PLATINUM III</option>
            <option value="19">PLATINUM II</option>
            <option value="20">PLATINUM I</option>
            <option value="21">DIAMOND IV</option>
            <option value="22">DIAMOND III</option>
            <option value="23">DIAMOND II</option>
            <option value="24">DIAMOND I</option>
            <option value="25">MASTER</option>
            <option value="26">GRANDMASTER</option>
            <option value="27">CHALLENGER</option>
        </React.Fragment>
    );
}

export default LolRanks;