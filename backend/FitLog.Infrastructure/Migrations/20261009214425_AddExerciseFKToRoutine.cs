using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitLog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExerciseFKToRoutine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Routines_Exercises_ExerciseId",
                table: "Routines");

            migrationBuilder.DropIndex(
                name: "IX_Routines_ExerciseId",
                table: "Routines");
        }
    }
}
