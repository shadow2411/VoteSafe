const { Election, User } = require("../components/models");
const ethers = require("ethers");
const { utils } = require("ethers/lib/utils");

const voteCastingControllerBlockchain = async (req, res) => {
  const { eid, cid, vid } = req.params;
  const election = await Election.findOne({ _id: eid });
  const user = await User.findOne({ _id: cid });
  const voter = await User.findOne({ _id: vid });
  if (!election) {
    return res
      .status(404)
      .json({ success: false, message: "Election not found" });
  }
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!voter) {
    return res.status(404).json({ success: false, message: "Voter not found" });
  }
  const contractAddress = "YOur deployed Contract address";
  const provider = new ethers.providers.JsonRpcProvider(
    "Your rpc provider link"
  );
  const signer = new ethers.Wallet(
    "YOur wallet for signer",
    provider
  );
  const {
    abi,
  } = require("../../blockchain/artifacts/contracts/voteCasting.sol/voteCasting.json");
  const ContractInstance = new ethers.Contract(contractAddress, abi, signer);
  const votersArray = election.voter;
  const candidatesArray = election.candidate;
  const tx = await ContractInstance.setStructs(
    votersArray,
    candidatesArray,
    user.email,
    voter.email
  );
  await tx.wait();
  await ContractInstance.doVoting();
  const votersBlockChain = await ContractInstance.getVoter();

  const candidatesBlockChain = await ContractInstance.getCandidates();

  for (let I = 0; I < candidatesBlockChain.length; I++) {
    election.candidate[I].votes = parseInt(candidatesBlockChain[I].votes);
  }

  for (let i = 0; i < votersBlockChain.length; i++) {
    election.voter[i].voted = votersBlockChain[i].voted;
  }
  await ContractInstance.remove();
  await Election.findOneAndUpdate({ _id: eid }, election).exec();
  res.status(200).json({ success: true });
};
module.exports = { voteCastingControllerBlockchain };
