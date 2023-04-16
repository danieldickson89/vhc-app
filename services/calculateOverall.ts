export default function calculateOverall(player: Player) {
  return Math.round(
    (player.offense +
      player.defense +
      player.skating +
      player.passing +
      player.shot +
      player.stick) /
      6
  );
}
