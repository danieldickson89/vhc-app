import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PlayerDetails({
  player,
  isNew,
  apiBaseUrl,
}: {
  player: Player;
  isNew: boolean;
  apiBaseUrl: string;
}) {
  const router = useRouter();

  let [currName, setName] = useState<string>(isNew ? "" : player.name);
  let [currOffense, setOffense] = useState<number | null>(
    isNew ? null : player.offense
  );
  let [currDefense, setDefense] = useState<number | null>(
    isNew ? null : player.defense
  );
  let [currSkating, setSkating] = useState<number | null>(
    isNew ? null : player.skating
  );
  let [currPassing, setPassing] = useState<number | null>(
    isNew ? null : player.passing
  );
  let [currShot, setShot] = useState<number | null>(isNew ? null : player.shot);
  let [currStick, setStick] = useState<number | null>(
    isNew ? null : player.stick
  );

  async function savePlayer() {
    const currPlayer = {
      name: currName,
      offense: currOffense,
      defense: currDefense,
      skating: currSkating,
      passing: currPassing,
      shot: currShot,
      stick: currStick,
      attending: isNew ? true : player.attending,
    };
    const reqUrl = isNew
      ? `${apiBaseUrl}player`
      : `${apiBaseUrl}player?id=${player.id}`;
    await fetch(reqUrl, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currPlayer),
    });
    router.push("/players/roster");
  }

  async function deletePlayer() {
    const reqUrl = `${apiBaseUrl}player?id=${player.id}`;
    await fetch(reqUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/players/roster");
  }

  return (
    <div className={utilStyles.container}>
      <Toolbar></Toolbar>
      <div className={utilStyles.navbarSpacer}></div>
      <div className={utilStyles.myForm}>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Full Name </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myTextInput}`}
            name="fullName"
            defaultValue={currName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Offense </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="offense"
            defaultValue={currOffense?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setOffense(+e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Defense </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="defense"
            defaultValue={currDefense?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setDefense(+e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Skating </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="skating"
            defaultValue={currSkating?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setSkating(+e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Passing </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="passing"
            defaultValue={currPassing?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setPassing(+e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Shot </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="shot"
            defaultValue={currShot?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setShot(+e.target.value)}
          />
        </div>
        <div className={utilStyles.myFormRow}>
          <label className={utilStyles.myLabel}>Stick </label>
          <input
            className={`${utilStyles.myInput} ${utilStyles.myNumberInput}`}
            name="stick"
            defaultValue={currStick?.toString()}
            type="number"
            min="0"
            max="100"
            onChange={(e) => setStick(+e.target.value)}
          />
        </div>
        <div
          className={`${utilStyles.myFormRow} ${utilStyles.myFormRowCentered}`}
        >
          <button
            className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonCancel}`}
          >
            <Link href={`/players/roster`}>Cancel</Link>
          </button>
          {!isNew ? (
            <button
              className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonRed}`}
              onClick={deletePlayer}
            >
              Delete
            </button>
          ) : (
            <></>
          )}

          <button
            className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonSave}`}
            onClick={savePlayer}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
