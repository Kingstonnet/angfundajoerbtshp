CREATE OR REPLACE PROCEDURE get_data_by_condition (
    p_condition_value IN VARCHAR2,
    p_result_cursor   OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_result_cursor FOR
        SELECT column1, column2, column3 -- Specify the columns you need
        FROM your_table_name
        WHERE your_column_name = p_condition_value;
END;


CREATE OR REPLACE PROCEDURE get_employee_data (
    p_department_id IN NUMBER,
    p_employee_name IN VARCHAR2,
    p_employee_cursor OUT SYS_REFCURSOR,
    p_department_cursor OUT SYS_REFCURSOR
)
AS
BEGIN
    -- First SELECT statement based on department ID
    OPEN p_employee_cursor FOR
        SELECT employee_id, first_name, last_name, email
        FROM employees
        WHERE department_id = p_department_id;

    -- Second SELECT statement based on employee name
    OPEN p_department_cursor FOR
        SELECT department_id, department_name, location_id
        FROM departments
        WHERE department_id IN (SELECT department_id FROM employees WHERE first_name LIKE '%' || p_employee_name || '%');
END;


import java.sql.*;

public class OracleDataFetcher {

    public static void main(String[] args) {
        String url = "jdbc:oracle:thin:@localhost:1521:XE"; // Replace with your connection details
        String user = "your_username";
        String password = "your_password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            CallableStatement cstmt = conn.prepareCall("{call get_employee_data(?, ?, ?, ?)}");

            // Set IN parameters
            cstmt.setInt(1, 10); // Example department ID
            cstmt.setString(2, "John"); // Example employee name

            // Register OUT parameters as SYS_REFCURSOR
            cstmt.registerOutParameter(3, OracleTypes.CURSOR);
            cstmt.registerOutParameter(4, OracleTypes.CURSOR);

            cstmt.execute();

            // Retrieve the first result set (employees)
            ResultSet employeeRs = (ResultSet) cstmt.getObject(3);
            System.out.println("Employee Data:");
            while (employeeRs.next()) {
                System.out.println("ID: " + employeeRs.getInt("employee_id") +
                                   ", Name: " + employeeRs.getString("first_name") + " " + employeeRs.getString("last_name"));
            }
            employeeRs.close();

            // Retrieve the second result set (departments)
            ResultSet departmentRs = (ResultSet) cstmt.getObject(4);
            System.out.println("\nDepartment Data:");
            while (departmentRs.next()) {
                System.out.println("Dept ID: " + departmentRs.getInt("department_id") +
                                   ", Name: " + departmentRs.getString("department_name"));
            }
            departmentRs.close();

            cstmt.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
oracle pl/sql procedure to return multiple select statement from table where condition applie the variable name tojava api