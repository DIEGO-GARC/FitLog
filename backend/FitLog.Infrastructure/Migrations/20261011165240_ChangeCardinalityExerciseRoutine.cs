using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitLog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCardinalityExerciseRoutine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Routines_Exercises_ExerciseId",
                table: "Routines");

            migrationBuilder.DropIndex(
                name: "IX_Routines_ExerciseId",
                table: "Routines");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "Routines");

            migrationBuilder.AddColumn<int>(
                name: "RoutineId",
                table: "Exercises",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_RoutineId",
                table: "Exercises",
                column: "RoutineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Routines_RoutineId",
                table: "Exercises",
                column: "RoutineId",
                principalTable: "Routines",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Routines_RoutineId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_RoutineId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "RoutineId",
                table: "Exercises");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "Routines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Routines_ExerciseId",
                table: "Routines",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Routines_Exercises_ExerciseId",
                table: "Routines",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
