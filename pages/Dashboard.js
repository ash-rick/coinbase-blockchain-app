import Header from "../components/Header";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Dashboard = ({ address }) => {
  const [twTokens, setTwTokens] = useState([]);
  const [sanityTokens, setSanityTokens] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://i6krfo72.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D"
        );
        const tempSanityTokens = await coins.json();
        console.log(tempSanityTokens);
        setSanityTokens(tempSanityTokens.result);
      } catch (error) {
        console.error(error);
      }
    };

    return getCoins();
  }, []);

  useEffect(() => {
    if (sanityTokens) {
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.NEXT_PUBLIC_METAMASK_KEY,
          // new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/")
          ethers.getDefaultProvider(
            "https://rinkeby.infura.io/v3/4b4e91062d2f419a8cf552e4721eb7c6"
          )
        )
      );

      sanityTokens.map((tokenItem) => {
        const currentToken = sdk.getTokenModule(tokenItem.contractAddress);

        setTwTokens((prevState) => [...prevState, currentToken]);
      });
    }
  }, [sanityTokens]);

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          twTokens={twTokens}
          sanityTokens={sanityTokens}
          walletAddress={address}
        />
        <Main
          twTokens={twTokens}
          sanityTokens={sanityTokens}
          walletAddress={address}
        />
      </MainContainer>
    </Wrapper>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {}

const Wrapper = styled.div`
  display: flex;
  height: 200vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`;

const MainContainer = styled.div`
  flex: 1;
`;
