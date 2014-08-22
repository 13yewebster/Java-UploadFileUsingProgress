package com.me.project;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.me.project.UploadProgressListener;

public class ProgressServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");

		PrintWriter writer = response.getWriter();

		if(UploadServlet.isLocal()) {

   			System.out.println("Progress Local !!!");
			HttpSession session = request.getSession(true);
			UploadProgressListener testProgressListener = (UploadProgressListener) session.getAttribute("LISTENER");
			writer.println(testProgressListener.getMessage());

		} else {

			System.out.println("Progress S3 !!!");
			writer.println(UploadServlet.getMessage());

		}


		writer.flush();

		writer.close();

	}

}
