import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <Tabs>
      <TabList>
        <Tab>Movies</Tab>
        <Tab>
          <Link href="/bookmarks/" as={`/bookmarks`}>
            Bookmarks
          </Link>
        </Tab>
        <Tab>
          <Link href="/profile">Profile</Link>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Text fontSize="6xl" textAlign="center">
            My Movies
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
